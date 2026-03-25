import { Question, Answer } from '../types';
import { MultipleChoice } from './Questions/MultipleChoice';
import { Scale } from './Questions/Scale';
import { TextInput } from './Questions/TextInput';
import { MultipleWithText } from './Questions/MultipleWithText';

interface QuestionCardProps {
  question: Question;
  answer?: Answer;
  onAnswerChange: (answer: Answer) => void;
  isAnswered: boolean;
}

export function QuestionCard({
  question,
  answer,
  onAnswerChange,
  isAnswered,
}: QuestionCardProps) {
  const handleChange = (value: string | number) => {
    onAnswerChange({
      questionId: question.id,
      value,
    });
  };

  const handleTextChange = (textValue: string) => {
    onAnswerChange({
      questionId: question.id,
      value: answer?.value || null,
      textValue,
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <div className="text-secondary text-sm mb-2">
          Pergunta {question.id} de 14
        </div>
        <h2 className="text-3xl font-bold text-white leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="py-6">
        {question.type === 'multiple-choice' && question.options && (
          <MultipleChoice
            options={question.options}
            selected={answer?.value as string}
            onChange={handleChange}
          />
        )}

        {question.type === 'scale' && question.options && (
          <Scale
            options={question.options}
            selected={answer?.value as string}
            onChange={handleChange}
          />
        )}

        {question.type === 'text-short' && (
          <TextInput
            value={answer?.value as string | ''}
            onChange={handleChange}
            placeholder={question.placeholder}
            multiline={false}
          />
        )}

        {question.type === 'text-long' && (
          <TextInput
            value={answer?.value as string | ''}
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

      {!isAnswered && (
        <div className="text-secondary text-sm">
          ⚠️ Por favor, responda a pergunta para continuar
        </div>
      )}
    </div>
  );
}
