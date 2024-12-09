// utils/validationUtils.ts

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const usernameRegex = /^[a-zA-Z0-9_]+$/;

export const passwordRegex = /^[a-zA-Z0-9]+$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
  return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password);
};
