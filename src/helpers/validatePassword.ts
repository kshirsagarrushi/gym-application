const validatePassword = (password: string): string | null => {
  if (password.length < 8 || password.length > 16) {
    return "Password must be between 8 and 16 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character (!@#$%^&*).";
  }

  if (/\s/.test(password)) {
    return "Password must not contain spaces.";
  }

  return null; // Password is valid
};

export default validatePassword;
