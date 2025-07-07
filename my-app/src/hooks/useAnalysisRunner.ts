// src/hooks/useAnalysisRunner.ts
import { useState } from "react";
import { calculateAge, MAX_AGE } from "../utils/ageUtils";

interface UseAnalysisRunnerParams {
  formData: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: Date | null;
    zipCode: string;
    ssn: string;
  };
  onStart?: () => void;
  onComplete?: () => void;
}

export function useAnalysisRunner({
  formData,
  onStart,
  onComplete,
}: UseAnalysisRunnerParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const execute = () => {
    const { firstName, lastName, gender, dob, zipCode, ssn } = formData;
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!gender) newErrors.gender = "Gender is required.";

    if (!dob || isNaN(dob.getTime())) {
      newErrors.dob = "Enter a valid date of birth.";
    } else {
      const ageStr = calculateAge(dob.toISOString().split("T")[0]);
      if (!ageStr) {
        newErrors.dob = `Age must be valid and under ${MAX_AGE} years.`;
      }
    }

    if (!zipCode || zipCode.length < 5) {
      newErrors.zipCode = "Enter a valid 5-digit ZIP code.";
    }

    if (!ssn || ssn.replace(/\D/g, '').length < 9) {
      newErrors.ssn = "Enter a 9-digit SSN.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Trigger external start logic (e.g. toast, analytics)
    onStart?.();

    // Reset and run
    setErrors({});
    setProgress(0);
    setSubmitted(false);
    setIsLoading(true);

    const step = 100 / (5000 / 100);
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setSubmitted(true);
      onComplete?.();
    }, 5000);
  };

  return {
    isLoading,
    progress,
    submitted,
    errors,
    execute,
  };
}
