// src/components/FormError.tsx

import React from "react";
import ErrorIcon from "../../assets/images/error.svg";
import { formErrorClass, formErrorIconClass } from './styles';

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
    <div className={formErrorClass}>
      <img src={ErrorIcon} alt="Error" className={formErrorIconClass} />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
