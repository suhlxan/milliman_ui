// src/components/SSNField.tsx
import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ssnIconClass } from './styles';
import VisibilityOn from "../../assets/images/visibility_on.svg";
import VisibilityOff from "../../assets/images/visibility_off.svg";

// Props definition for the SSNField component
export interface SSNFieldProps {
  value: string;                      // Current SSN value (formatted)
  show: boolean;                      // Whether the SSN is visible or masked
  onChange: (newVal: string) => void; // Callback for when the input changes
  onToggleVisibility: () => void;     // Callback to toggle SSN visibility
  className?: string;                 // Optional class for styling
  error?: boolean;                    // Whether the input is in an error state
  helperText?: React.ReactNode;       // Helper text (e.g., error messages)
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

  /**
   * Handle user input and format it as an SSN.
   * - Removes non-digit characters
   * - Limits to 9 digits
   * - Formats as XXX-XX-XXXX
   */
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
      type={show ? "text" : "password"} // Mask or unmask based on `show`
      error={error}
      helperText={helperText}
      inputProps={{
        maxLength: 11,            
        inputMode: "numeric",     
        pattern: "\\d*",          // Numeric pattern for validation
      }}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {/* Toggle visibility icon */}
            <IconButton onClick={onToggleVisibility} edge="end">
              <img
                src={show ? VisibilityOff : VisibilityOn}
                alt={show ? "Hide SSN" : "Show SSN"}
                className={ssnIconClass}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SSNField;
