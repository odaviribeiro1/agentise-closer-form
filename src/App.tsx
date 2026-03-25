import { useState, useEffect } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { EndScreen } from './components/EndScreen';
import { questions } from './lib/questions';
import { supabase } from './lib/supabase';
import { Answer, ApplicationData } from './types';
import axios from 'axios';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [eliminated, setEliminated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load answers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('formAnswers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(new Map(parsed));
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('formAnswers', JSON.stringify(Array.from(answers.entries())));
  }, [answers]);

  const question = questions[currentQuestion];
  const currentAnswer = answers.get(question.id);

  const isAnswered = () => {
    const answer = answers.get(question.id);
    if (!answer) return false;

    if (question.type === 'multiple-choice' || question.type === 'scale') {
      return answer.value !== null && answer.value !== undefined;
    }

    if (question.type === 'multiple-with-text') {
      if (answer.value !== 'sim') return answer.value !== null;
      return answer.value === 'sim' && !!answer.textValue?.trim();
    }

    return !!answer.value?.toString().trim();
  };

  const handleAnswerChange = (answer: Answer) => {
    const newAnswers = new Map(answers);
    newAnswers.set(answer.questionId, answer);
    setAnswers(newAnswers);

    // Check for elimination
    const selectedOption = question.options?.find((opt) => opt.value === answer.value);
    if (selectedOption?.isEliminating) {
      setEliminated(true);
    }
  };

  const handleNext = () => {
    if (!isAnswered()) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitForm();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitForm = async () => {
    setSubmitting(true);

    try {
      // Prepare application data
      const applicationData: ApplicationData = {
        status: eliminated ? 'eliminated' : 'pending',
        eliminated: eliminated,
        eliminated_at_question: undefined,
      };

      // Map answers to database columns
      answers.forEach((answer, questionId) => {
        const key = `q${questionId}` as keyof ApplicationData;
        if (questionId === 8) {
          applicationData['q8'] = answer.value as string;
          applicationData['q8_details'] = answer.textValue;
        } else if (questionId === 10) {
          applicationData['q10'] = answer.value as string;
          applicationData['q10_justification'] = answer.textValue;
        } else {
          (applicationData[key] as any) = answer.value || answer.textValue;
        }
      });

      // Save to Supabase
      const { error: dbError } = await supabase
        .from('closer_applications')
        .insert([applicationData]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw new Error(`Failed to save to database: ${dbError.message}`);
      }

      // Send to N8N webhook
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await axios.post(webhookUrl, {
            ...applicationData,
            timestamp: new Date().toISOString(),
            answers: Object.fromEntries(answers),
          });
        } catch (webhookError) {
          console.error('Webhook error:', webhookError);
          // Continue even if webhook fails
        }
      }

      // Clear localStorage
      localStorage.removeItem('formAnswers');

      // Show success screen after a short delay
      setTimeout(() => {
        setSubmitting(false);
      }, 500);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(
        'Erro ao enviar o formulário. Por favor, tente novamente ou contate o suporte.'
      );
      setSubmitting(false);
    }
  };

  if (eliminated || submitting) {
    return <EndScreen type={eliminated ? 'eliminated' : 'success'} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />

      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <QuestionCard
          question={question}
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          isAnswered={isAnswered()}
        />

        <div className="mt-12 flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-secondary border-2 border-border hover:border-secondary hover:text-white"
          >
            ← Voltar
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="px-8 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Enviar' : 'Avançar →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
