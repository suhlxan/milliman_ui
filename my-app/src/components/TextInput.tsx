import React from "react";
import FormError from "./FormError";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  inputClasses?: string;
  className?: string;  // for outer div
  error?: string;
  maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  inputClasses = "",
  className = "",
  error,
  maxLength,
}) => {
  return (
    <div className={className}>
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
      />
      {error && <FormError message={error} />}
    </div>
  );
};

export default TextInput;
