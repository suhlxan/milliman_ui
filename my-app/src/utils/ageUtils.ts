/**
 * Calculate age based on date of birth.
 * Returns age in months or in years and months.
 */
export const calculateAge = (birthDate: string): string | null => {
  const dob = new Date(birthDate);
  const today = new Date();

  if (isNaN(dob.getTime())) return null;

  const years = today.getFullYear() - dob.getFullYear();
  const months = today.getMonth() - dob.getMonth();
  const days = today.getDate() - dob.getDate();

  let totalMonths = years * 12 + months;
  if (days < 0) totalMonths--;

  const exactYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths === 1 ? '' : 's'}`;
  }

  if (exactYears < 2) {
    return `${exactYears} year${exactYears === 1 ? '' : 's'}, ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
  }

  return `${exactYears} year${exactYears === 1 ? '' : 's'}`;
};
