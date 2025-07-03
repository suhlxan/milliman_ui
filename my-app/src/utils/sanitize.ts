// src/utils/sanitize.ts

/**
 * Removes all characters except letters, apostrophes, and hyphens.
 */
export function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}'\-]/gu, '');
}
