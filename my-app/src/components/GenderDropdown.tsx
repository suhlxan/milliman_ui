// src/components/GenderDropdown.tsx
import React from "react";
import ArrowDropDown from "../assets/images/arrow_drop_down.svg";

interface GenderDropdownProps {
  value: string;
  onChange: (value: string) => void;
  inputClasses: string;
}

const GenderDropdown: React.FC<GenderDropdownProps> = ({ value, onChange, inputClasses }) => {
  return (
    <div className="relative">
      <select
        className={`${inputClasses} appearance-none pr-10 w-full`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <img
        src={ArrowDropDown}
        alt="Dropdown Arrow"
        className="pointer-events-none w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default GenderDropdown;