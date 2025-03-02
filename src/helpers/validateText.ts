export function validateText(input: string): boolean {
  // Regular expression to check for non-alphabetic characters
  const isValid = /^[a-zA-Z]+$/.test(input);

  // Return true if the input contains only letters, otherwise false
  return isValid;
}

export default validateText;
