// src/hooks/useAnalysisRunner.ts
import { useState } from "react";
import { calculateAge, MAX_AGE } from "../utils/ageUtils";
import { stepDescriptions } from "../components/Workflow/WorkflowStatusList";
import AgentService from "../api/AgentService";

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
  onComplete?: (result: any) => void;
  onStatusUpdate?: (status: Record<string, string>) => void;
}

export function useAnalysisRunner({
  formData,
  onStart,
  onComplete,
  onStatusUpdate,
}: UseAnalysisRunnerParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const execute = async () => {
    const { firstName, lastName, gender, dob, zipCode, ssn } = formData;
    const newErrors: Record<string, string> = {};

    // Validation
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

    if (!/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = "Enter a valid 5-digit ZIP code.";
    }

    if (!/^\d{9}$/.test(ssn.replace(/\D/g, ''))) {
      newErrors.ssn = "Enter a 9-digit SSN.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    onStart?.();
    setErrors({});
    setProgress(0);
    setSubmitted(false);
    setIsLoading(true);

    // Simulate step progress
    const stepKeys = Object.keys(stepDescriptions);
    const totalSteps = stepKeys.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      const statusUpdate: Record<string, string> = {};
      stepKeys.forEach((key, index) => {
        if (index < currentStep) statusUpdate[key] = "completed";
        else if (index === currentStep) statusUpdate[key] = "processing";
        else statusUpdate[key] = "waiting";
      });

      onStatusUpdate?.(statusUpdate);
      setProgress(((currentStep + 1) / totalSteps) * 100);
      currentStep++;

      if (currentStep >= totalSteps) {
        clearInterval(interval);
      }
    }, 3000); // 3 seconds per step

    // Call the API
    // try {
    //   const payload = {
    //     first_name: firstName,
    //     last_name: lastName,
    //     ssn,
    //     date_of_birth: dob?.toISOString().split("T")[0] ?? '',
    //     gender: gender.charAt(0),
    //     zip_code: zipCode,
    //   };

    //   const syncResult = await AgentService.runAnalysisSync(payload);

    //   if (syncResult.success) {
    //     setSubmitted(true);
    //     onComplete?.(syncResult);
    //   } else {
    //     setErrors({ general: "Synchronous analysis failed. Please check form input." });
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.error("Sync analysis failed:", error);
    //   setErrors({ general: "Unexpected error during execution." });
    //   setIsLoading(false);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return {
    isLoading,
    progress,
    submitted,
    errors,
    execute,
    setSubmitted,
  };
}
