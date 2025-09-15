export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateNote = (title: string, content: string): ValidationResult => {
  const errors: string[] = [];

  // Title validation
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    errors.push('Title is required');
  } else if (trimmedTitle.length > 50) {
    errors.push('Title must not exceed 50 characters');
  }

  // Content validation
  const trimmedContent = content.trim();
  if (trimmedContent.length > 500) {
    errors.push('Content must not exceed 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getCharacterCountColor = (current: number, max: number): string => {
  const percentage = (current / max) * 100;
  if (percentage >= 90) return '#dc2626'; // Red
  if (percentage >= 75) return '#d97706'; // Orange
  return '#6b7280'; // Gray
};