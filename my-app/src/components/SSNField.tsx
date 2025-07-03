// src/components/SSNField.tsx
import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOn from "../assets/images/visibility_on.svg";
import VisibilityOff from "../assets/images/visibility_off.svg";

export interface SSNFieldProps {
  value: string;
  show: boolean;
  onChange: (newVal: string) => void;
  onToggleVisibility: () => void;
  className?: string;


  error?: boolean;
  helperText?: React.ReactNode;
}

const SSNField: React.FC<SSNFieldProps> = ({
  value,
  show,
  onChange,
  onToggleVisibility,
  className = "",
  error = false,
  helperText,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 9);

    let formatted: string;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else {
      formatted = raw;
    }

    onChange(formatted);
  };

  return (
    <TextField
      className={className}
      label="SSN"
      value={value}
      placeholder="123-45-6789"
      onChange={handleInput}
      type={show ? "text" : "password"}
      error={error} 
      helperText={helperText} 
      inputProps={{
        maxLength: 11,
        inputMode: "numeric",
        pattern: "\\d*",
      }}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onToggleVisibility} edge="end">
              <img
                src={show ? VisibilityOff : VisibilityOn}
                alt={show ? "Hide SSN" : "Show SSN"}
                className="w-5 h-5"
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SSNField;
