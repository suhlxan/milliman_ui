import { useState } from 'react';

export function useHealthAgentAnalysis(durationMs = 5000, tickInterval = 100) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const startAnalysis = () => {
    setIsLoading(true);
    const step = 100 / (durationMs / tickInterval);

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, tickInterval);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setSubmitted(true);
      setProgress(0);
    }, durationMs);
  };

  return {
    isLoading,
    progress,
    submitted,
    startAnalysis,
  };
}
