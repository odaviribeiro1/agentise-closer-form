import { Option } from '../../types';

interface MultipleChoiceProps {
  options: Option[];
  selected?: string;
  onChange: (value: string) => void;
}

export function MultipleChoice({ options, selected, onChange }: MultipleChoiceProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.value)}
          className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium ${
            selected === option.value
              ? 'border-primary bg-primary/10'
              : 'border-border bg-surface hover:border-secondary hover:bg-surface/80'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
