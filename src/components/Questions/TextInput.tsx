interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  multiline = false,
  maxLength,
}: TextInputProps) {
  const baseClasses = "w-full bg-transparent border-0 border-b-2 border-border-light text-text-main placeholder-placeholder focus:outline-none focus:border-primary transition-all duration-200 text-base py-2 md:py-3 px-0";

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={baseClasses + " resize-none min-h-20 md:min-h-24"}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={baseClasses}
    />
  );
}
