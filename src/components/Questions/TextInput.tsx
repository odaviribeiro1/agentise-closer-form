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
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={6}
        className="w-full p-4 bg-surface border-2 border-border rounded-lg text-white placeholder-secondary focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
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
      className="w-full p-4 bg-surface border-2 border-border rounded-lg text-white placeholder-secondary focus:outline-none focus:border-primary transition-colors duration-200"
    />
  );
}
