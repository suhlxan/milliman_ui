// src/components/FormError.tsx

import React from "react";
import ErrorIcon from "../assets/images/error.svg";

interface FormErrorProps {
  message: string;
}

/**
 * FormError Component
 * ------------------------------------------------------------------------------
 * Displays a styled error message for form validation feedback.
 * 
 * Usage:
 * <FormError message="This field is required" />
 */

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="flex items-start gap-2 text-brand-error text-sm mt-1">
      <img src={ErrorIcon} alt="Error" className="w-4 h-4 mt-0.5" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
