import type { Option } from '../../types';
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
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="space-y-4 md:space-y-5">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onChange(option.value)}
            className={`w-full flex items-center gap-4 px-4 md:px-5 py-3.5 md:py-4 rounded-lg border-2 transition-all duration-200 text-left min-h-[52px] md:min-h-[56px] ${
              selected === option.value
                ? 'border-primary bg-bg-selected'
                : 'border-border-light bg-white hover:bg-bg-hover'
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold transition-all duration-200 flex-shrink-0 ${
                selected === option.value
                  ? 'bg-primary text-white'
                  : 'bg-white border border-primary text-primary'
              }`}
            >
              {letters[index]}
            </div>
            <span className={`text-[15px] md:text-base font-normal ${selected === option.value ? 'text-text-main' : 'text-text-main'}`}>
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {selected === 'sim' && (
        <div className="animate-fadeIn pt-2">
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
