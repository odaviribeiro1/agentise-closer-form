import { Option } from '../../types';

interface ScaleProps {
  options: Option[];
  selected?: string;
  onChange: (value: string) => void;
}

export function Scale({ options, selected, onChange }: ScaleProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.value)}
          className={`w-16 h-16 rounded-lg border-2 font-bold text-lg transition-all duration-200 ${
            selected === option.value
              ? 'border-primary bg-primary text-white scale-105'
              : 'border-border bg-surface hover:border-secondary'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
