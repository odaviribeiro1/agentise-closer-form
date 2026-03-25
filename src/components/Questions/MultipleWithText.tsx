import { Option } from '../../types';
import { TextInput } from './TextInput';

interface MultipleWithTextProps {
  options: Option[];
  selected?: string;
  textValue?: string;
  onChange: (value: string) => void;
  onTextChange: (value: string) => void;
  placeholder?: string;
}

export function MultipleWithText({
  options,
  selected,
  textValue,
  onChange,
  onTextChange,
  placeholder,
}: MultipleWithTextProps) {
  return (
    <div className="space-y-4">
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

      {selected === 'sim' && (
        <div className="animate-fadeIn">
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
