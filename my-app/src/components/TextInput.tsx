// src/components/TextInput.tsx
import React from "react";
import FormError from "./FormError";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  inputClasses: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  inputClasses,
  error,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <FormError message={error} />}
    </div>
  );
};

export default TextInput;