import type { Option } from '../../types';

interface ScaleProps {
  options: Option[];
  selected?: string;
  onChange: (value: string) => void;
}

export function Scale({ options, selected, onChange }: ScaleProps) {
  return (
    <div className="flex gap-2 md:gap-3 justify-start max-w-full md:max-w-[400px]">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.value)}
          className={`flex-1 h-12 md:h-14 rounded-lg border-2 font-semibold text-base transition-all duration-200 min-h-[48px] md:min-h-[56px] ${
            selected === option.value
              ? 'border-primary bg-primary text-white'
              : 'border-border-light bg-white text-text-main hover:bg-bg-hover'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
