import { useState, useEffect } from 'react';
import { questions } from './lib/questions';
import { supabase } from './lib/supabase';
import type { Answer, ApplicationData, Option, Question } from './types';
import axios from 'axios';

// ── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;
  return (
    <div className="fixed top-0 left-0 w-full z-50" style={{ height: '4px', background: 'transparent' }}>
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%`, background: '#2563EB' }}
      />
    </div>
  );
}

// ── Multiple Choice ───────────────────────────────────────────────────────────

function MultipleChoice({
  options,
  selected,
  onChange,
}: {
  options: Option[];
  selected?: string;
  onChange: (value: string) => void;
}) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  return (
    <div className="flex flex-col gap-3">
      {options.map((option, index) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.value)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left cursor-pointer ${
              isSelected
                ? 'bg-blue-50 border-blue-400'
                : 'bg-white border-blue-200 hover:bg-blue-50/40'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-200 ${
                isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {letters[index]}
            </div>
            <span className="text-base font-normal text-[#2563EB]">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Scale ─────────────────────────────────────────────────────────────────────

function ScaleChoice({
  options,
  selected,
  onChange,
}: {
  options: Option[];
  selected?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 md:gap-3">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.value)}
            className={`flex-1 h-12 md:h-14 rounded-lg border font-semibold text-base transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-blue-200 text-[#2563EB] hover:bg-blue-50'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Text Input ────────────────────────────────────────────────────────────────

function TextInput({
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const baseClass =
    'w-full bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#2563EB] transition-all duration-200 text-base py-2 px-0';

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={baseClass + ' resize-none'}
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={baseClass}
    />
  );
}

// ── Multiple with Text ────────────────────────────────────────────────────────

function MultipleWithText({
  options,
  selected,
  textValue,
  onChange,
  onTextChange,
  placeholder,
}: {
  options: Option[];
  selected?: string;
  textValue?: string;
  onChange: (value: string) => void;
  onTextChange: (value: string) => void;
  placeholder?: string;
}) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.value)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left cursor-pointer ${
                isSelected
                  ? 'bg-blue-50 border-blue-400'
                  : 'bg-white border-blue-200 hover:bg-blue-50/40'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-200 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {letters[index]}
              </div>
              <span className="text-base font-normal text-[#2563EB]">{option.label}</span>
            </button>
          );
        })}
      </div>

      {selected === 'sim' && (
        <div className="pt-2 animate-[fadeIn_0.2s_ease-out]">
          <TextInput
            value={textValue || ''}
            onChange={onTextChange}
            placeholder={placeholder}
            multiline
          />
        </div>
      )}
    </div>
  );
}

// ── Question Card ─────────────────────────────────────────────────────────────

function QuestionCard({
  question,
  answer,
  onAnswerChange,
  total,
}: {
  question: Question;
  answer?: Answer;
  onAnswerChange: (answer: Answer) => void;
  total: number;
}) {
  const handleChange = (value: string | number) => {
    onAnswerChange({ questionId: question.id, value });
  };

  const handleTextChange = (textValue: string) => {
    onAnswerChange({ questionId: question.id, value: answer?.value || null, textValue });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-3">
          {question.id} / {total}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] leading-snug">
          {question.question}
        </h2>
      </div>

      <div>
        {question.type === 'multiple-choice' && question.options && (
          <MultipleChoice
            options={question.options}
            selected={answer?.value as string}
            onChange={handleChange}
          />
        )}

        {question.type === 'scale' && question.options && (
          <ScaleChoice
            options={question.options}
            selected={answer?.value as string}
            onChange={handleChange}
          />
        )}

        {question.type === 'text-short' && (
          <TextInput
            value={(answer?.value as string) || ''}
            onChange={handleChange}
            placeholder={question.placeholder}
            multiline={false}
          />
        )}

        {question.type === 'text-long' && (
          <TextInput
            value={(answer?.value as string) || ''}
            onChange={handleChange}
            placeholder={question.placeholder}
            multiline
          />
        )}

        {question.type === 'multiple-with-text' && question.options && (
          <MultipleWithText
            options={question.options}
            selected={answer?.value as string}
            textValue={answer?.textValue}
            onChange={handleChange}
            onTextChange={handleTextChange}
            placeholder={question.placeholder}
          />
        )}
      </div>
    </div>
  );
}

// ── End Screen ────────────────────────────────────────────────────────────────

function EndScreen({ type }: { type: 'eliminated' | 'success' }) {
  if (type === 'eliminated') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-[600px] text-center">
          <div className="text-6xl mb-6">👋</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">Obrigado!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            No momento, seu perfil não se encaixa nos requisitos desta vaga. Fique de olho nas
            nossas oportunidades futuras!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-[600px] text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">Enviado com sucesso!</h2>
        <p className="text-gray-500 text-base leading-relaxed">
          Suas respostas foram recebidas. Nossa equipe analisará seu perfil e entrará em contato em
          breve.
        </p>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [eliminated, setEliminated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('formAnswers');
    if (saved) {
      try {
        setAnswers(new Map(JSON.parse(saved)));
      } catch {
        // ignore
      }
    }
  }, []);

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

    const selectedOption = question.options?.find((opt) => opt.value === answer.value);
    if (selectedOption?.isEliminating) {
      setEliminated(true);
    }
  };

  const navigate = (direction: 'next' | 'prev') => {
    if (animating) return;
    if (direction === 'next' && !isAnswered()) return;

    setAnimating(true);
    setTimeout(() => {
      if (direction === 'next') {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((q) => q + 1);
        } else {
          submitForm();
        }
      } else {
        if (currentQuestion > 0) setCurrentQuestion((q) => q - 1);
      }
      setAnimating(false);
    }, 200);
  };

  const submitForm = async () => {
    setSubmitting(true);
    try {
      const applicationData: ApplicationData = {
        status: eliminated ? 'eliminated' : 'pending',
        eliminated,
        eliminated_at_question: undefined,
      };

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

      const { error: dbError } = await supabase.from('closer_applications').insert([applicationData]);
      if (dbError) throw new Error(`Failed to save: ${dbError.message}`);

      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await axios.post(webhookUrl, {
            ...applicationData,
            timestamp: new Date().toISOString(),
            answers: Object.fromEntries(answers),
          });
        } catch {
          // continue even if webhook fails
        }
      }

      localStorage.removeItem('formAnswers');
      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Erro ao enviar o formulário. Por favor, tente novamente.');
      setSubmitting(false);
    }
  };

  if (eliminated) return <EndScreen type="eliminated" />;
  if (submitted || submitting) return <EndScreen type="success" />;

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />

      {/* Content — vertically centered */}
      <div className="min-h-screen flex items-center justify-center py-16 px-6 pb-28 md:pb-16">
        <div
          className="w-full max-w-[600px]"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          <QuestionCard
            question={question}
            answer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            total={questions.length}
          />
        </div>
      </div>

      {/* Avançar — mobile: full-width bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <button
          onClick={() => navigate('next')}
          disabled={!isAnswered()}
          className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base"
        >
          {currentQuestion === questions.length - 1 ? 'Enviar' : 'Avançar'}
        </button>
      </div>

      {/* Avançar — desktop: bottom-left */}
      <div className="hidden md:block fixed bottom-12 left-12">
        <button
          onClick={() => navigate('next')}
          disabled={!isAnswered()}
          className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base"
        >
          {currentQuestion === questions.length - 1 ? 'Enviar' : 'Avançar'}
        </button>
      </div>

      {/* Navigation arrows — right center */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button
          onClick={() => navigate('prev')}
          disabled={currentQuestion === 0}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Pergunta anterior"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 12.5L10 7.5L15 12.5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => navigate('next')}
          disabled={!isAnswered()}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Próxima pergunta"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
