// src/components/DateInput.tsx
import React from "react";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  inputClasses: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, inputClasses }) => {
  return (
    <input
      type="date"
      max={new Date().toISOString().split("T")[0]}
      className={inputClasses}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default DateInput;