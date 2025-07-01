// src/utils/ageUtils.ts

/**
 * Check if the provided date string is a valid date of birth
 * and between 1900 and the current year.
 */
export const isValidDOB = (date: string): boolean => {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(date);

  const isRealDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  return isRealDate && year >= 1900 && year <= new Date().getFullYear();
};

/**
 * Calculate age based on date of birth.
 * Returns age in months or in years and months.
 */
export const calculateAge = (birthDate: string): string | null => {
  if (!isValidDOB(birthDate)) return null;

  const dob = new Date(birthDate);
  const today = new Date();

  const years = today.getFullYear() - dob.getFullYear();
  const months = today.getMonth() - dob.getMonth();
  const days = today.getDate() - dob.getDate();

  let totalMonths = years * 12 + months;
  if (days < 0) totalMonths--;

  const exactYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths === 1 ? "" : "s"}`;
  }

  if (exactYears < 2) {
    return `${exactYears} year${exactYears === 1 ? "" : "s"}, ${remainingMonths} month${remainingMonths === 1 ? "" : "s"}`;
  }

  return `${exactYears} year${exactYears === 1 ? "" : "s"}`;
};