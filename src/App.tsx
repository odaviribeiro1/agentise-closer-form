import { useState, useEffect } from 'react';
import { questions } from './lib/questions';
import { supabase } from './lib/supabase';
import type { Answer, ApplicationData, Option, Question } from './types';
import axios from 'axios';

// ── Welcome Screen ───────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <div style={{ width: '100%', maxWidth: 600 }}>
        <h1 className="text-2xl font-bold text-[#111] leading-snug mb-3">
          Vaga - Closer Pleno
        </h1>
        <p className="text-gray-500 text-base mb-8">
          Este questionário leva 4 minutos para ser preenchido.
        </p>
        <button
          onClick={onStart}
          className="px-10 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-150"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;
  return (
    <div className="fixed top-0 left-0 w-full z-50" style={{ height: '5px' }}>
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
            className={`w-full flex items-center gap-4 px-4 py-5 rounded-lg border transition-all duration-150 text-left cursor-pointer ${
              isSelected
                ? 'bg-blue-50 border-blue-400'
                : 'bg-white border-blue-200 hover:bg-blue-50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-150 ${
                isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {letters[index]}
            </div>
            <span className="text-sm text-[#2563EB]">{option.label}</span>
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
    <div className="flex gap-2">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.value)}
            className={`flex-1 h-12 rounded-lg border font-semibold text-sm transition-all duration-150 cursor-pointer ${
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
  placeholder = 'Sua resposta...',
  multiline = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const baseClass =
    'w-full bg-transparent border-0 border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-base py-2 px-0';

  return (
    <div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={baseClass + ' resize-none'}
          style={{ color: value ? '#111' : '#2563EB' }}
          onFocus={(e) => { e.target.style.color = '#111'; }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
          style={{ color: value ? '#111' : '#2563EB' }}
          onFocus={(e) => { e.target.style.color = '#111'; }}
        />
      )}
      {multiline && (
        <p className="mt-2 text-xs text-gray-400">
          Aperte <strong className="font-semibold">Shift + Enter</strong> para quebrar a linha.
        </p>
      )}
    </div>
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
      {options.map((option, index) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.value)}
            className={`w-full flex items-center gap-4 px-4 py-5 rounded-lg border transition-all duration-150 text-left cursor-pointer ${
              isSelected
                ? 'bg-blue-50 border-blue-400'
                : 'bg-white border-blue-200 hover:bg-blue-50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-150 ${
                isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {letters[index]}
            </div>
            <span className="text-sm text-[#2563EB]">{option.label}</span>
          </button>
        );
      })}

      {selected === 'sim' && (
        <div className="pt-2">
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
}: {
  question: Question;
  answer?: Answer;
  onAnswerChange: (answer: Answer) => void;
}) {
  const handleChange = (value: string | number) => {
    onAnswerChange({ questionId: question.id, value });
  };

  const handleTextChange = (textValue: string) => {
    onAnswerChange({ questionId: question.id, value: answer?.value || null, textValue });
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#111] leading-snug mb-6">
        {question.question}
      </h2>

      {/* Answer input */}
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
          placeholder={question.placeholder || 'Sua resposta...'}
          multiline={false}
        />
      )}

      {question.type === 'text-long' && (
        <TextInput
          value={(answer?.value as string) || ''}
          onChange={handleChange}
          placeholder={question.placeholder || 'Sua resposta...'}
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
  );
}

// ── End Screen ────────────────────────────────────────────────────────────────

function EndScreen({ type }: { type: 'eliminated' | 'success' }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-end pb-24 px-6">
      <div className="w-full max-w-[600px]">
        {type === 'eliminated' ? (
          <>
            <h2 className="text-2xl font-bold text-[#111] mb-4">Obrigado!</h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              No momento, seu perfil não se encaixa nos requisitos desta vaga.
              Fique de olho nas nossas oportunidades futuras!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-150"
            >
              Tentar Novamente
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#111] mb-4">Enviado com sucesso!</h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Suas respostas foram recebidas. Nossa equipe analisará seu perfil
              e entrará em contato em breve.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [started, setStarted] = useState(false);
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
    }, 180);
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

      const { error: dbError } = await supabase
        .from('closer_applications')
        .insert([applicationData]);
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

  if (!started) return <WelcomeScreen onStart={() => setStarted(true)} />;
  if (eliminated) return <EndScreen type="eliminated" />;
  if (submitted || submitting) return <EndScreen type="success" />;

  const answered = isAnswered();

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />

      {/* Main layout — content pushed to lower portion like Respondi */}
      <div className="min-h-screen flex flex-col justify-start items-center pb-12 px-6" style={{ paddingTop: '15vh' }}>
        <div style={{ width: '100%', maxWidth: 600, position: 'relative', paddingRight: 56 }}>

          {/* Animated question */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.18s ease, transform 0.18s ease',
            }}
          >
            <QuestionCard
              question={question}
              answer={currentAnswer}
              onAnswerChange={(answer) => {
                const newAnswers = new Map(answers);
                newAnswers.set(answer.questionId, answer);
                setAnswers(newAnswers);
                const selectedOption = question.options?.find(
                  (opt) => opt.value === answer.value
                );
                if (selectedOption?.isEliminating) setEliminated(true);
              }}
            />

            {/* Avançar button — inline below the card */}
            <div className="mt-6">
              <button
                onClick={() => navigate('next')}
                disabled={!answered}
                className="px-10 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Enviar' : 'Avançar'}
              </button>
            </div>
          </div>

          {/* Navigation arrows — absolute right of content */}
          <div className="absolute right-0 bottom-0 flex flex-col gap-2 items-center">
            {/* Up arrow — plain */}
            <button
              onClick={() => navigate('prev')}
              disabled={currentQuestion === 0}
              className="w-9 h-9 flex items-center justify-center transition-opacity duration-150 disabled:opacity-25"
              title="Pergunta anterior"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 11L9 6L14 11" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Down arrow — blue circle */}
            <button
              onClick={() => navigate('next')}
              disabled={!answered}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-25"
              style={{ background: answered ? '#2563EB' : '#93C5FD' }}
              title="Próxima pergunta"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 7L9 12L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
