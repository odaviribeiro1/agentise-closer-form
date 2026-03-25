import { useState, useEffect } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { EndScreen } from './components/EndScreen';
import { questions } from './lib/questions';
import { supabase } from './lib/supabase';
import type { Answer, ApplicationData } from './types';
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
    <div className="min-h-screen bg-background flex flex-col pt-[3px] md:pt-1">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-6 md:pt-8 pb-24 md:pb-12">
        <div className="container-responsive flex flex-col justify-start" style={{ minHeight: 'calc(100vh - 200px)', justifyContent: 'flex-start', paddingTop: '20vh' }}>
          <div className="animate-slideIn">
            <QuestionCard
              question={question}
              answer={currentAnswer}
              onAnswerChange={handleAnswerChange}
            />
          </div>
        </div>
      </div>

      {/* Bottom button (mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border-light p-4 container-responsive flex gap-3">
        <button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="flex-1 h-12 bg-primary hover:bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base"
        >
          {currentQuestion === questions.length - 1 ? 'Enviar' : 'Avançar'}
        </button>
      </div>

      {/* Desktop button (left side) */}
      <div className="hidden md:flex fixed bottom-12 left-12 gap-3 items-center">
        <button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="px-6 h-12 bg-primary hover:bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base min-w-[140px]"
        >
          {currentQuestion === questions.length - 1 ? 'Enviar' : 'Avançar'}
        </button>
      </div>

      {/* Navigation arrows (fixed right) */}
      <div className="fixed right-6 md:right-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 md:gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-primary hover:bg-bg-hover rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-xl md:text-2xl"
          title="Pergunta anterior"
        >
          ↑
        </button>
        <button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-primary hover:bg-bg-hover rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-xl md:text-2xl"
          title="Próxima pergunta"
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default App;
