import type { Question, Answer } from '../types';
import { MultipleChoice } from './Questions/MultipleChoice';
import { Scale } from './Questions/Scale';
import { TextInput } from './Questions/TextInput';
import { MultipleWithText } from './Questions/MultipleWithText';

interface QuestionCardProps {
  question: Question;
  answer?: Answer;
  onAnswerChange: (answer: Answer) => void;
}

export function QuestionCard({
  question,
  answer,
  onAnswerChange,
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
    <div className="w-full animate-slideIn">
      <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
        <div className="text-text-secondary text-sm md:text-base font-normal">
          Pergunta {question.id} de 14
        </div>
        <h2 className="text-[22px] md:text-[26px] font-semibold text-text-main leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="space-y-4 md:space-y-5">
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
    </div>
  );
}
