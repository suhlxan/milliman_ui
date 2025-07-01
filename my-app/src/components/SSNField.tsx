// src/components/SSNField.tsx
import React from "react";
import VisibilityOn from "../assets/images/visibility_on.svg";
import VisibilityOff from "../assets/images/visibility_off.svg";

interface SSNFieldProps {
  value: string;
  show: boolean;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
  inputClasses: string;
}

const SSNField: React.FC<SSNFieldProps> = ({
  value,
  show,
  onChange,
  onToggleVisibility,
  inputClasses,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 9);
    const formatted =
      raw.length > 5
        ? `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5)}`
        : raw.length > 3
        ? `${raw.slice(0, 3)}-${raw.slice(3)}`
        : raw;
    onChange(formatted);
  };

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder="SSN"
        className={`${inputClasses} pr-12 w-full`}
        value={value}
        onChange={handleInput}
        maxLength={11}
      />
      {value && (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <img
            src={show ? VisibilityOff : VisibilityOn}
            alt={show ? "Hide SSN" : "Show SSN"}
            className="w-5 h-5"
          />
        </button>
      )}
    </div>
  );
};

export default SSNField;