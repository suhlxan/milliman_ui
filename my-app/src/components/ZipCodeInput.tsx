// src/components/ZipCodeInput.tsx
import React from "react";

interface ZipCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  inputClasses: string;
}

const ZipCodeInput: React.FC<ZipCodeInputProps> = ({ value, onChange, inputClasses }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 5);
    onChange(digitsOnly);
  };

  return (
    <input
      type="text"
      placeholder="Zip Code"
      className={inputClasses}
      value={value}
      onChange={handleChange}
    />
  );
};

export default ZipCodeInput;