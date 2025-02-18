// utils/auth.ts

export const saveToken = (token: string): void => {
  if (typeof window === 'undefined') return; // Ensure we're on the client side
  localStorage.setItem('jwtToken', token);
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null; // Ensure we're on the client side
  return localStorage.getItem('jwtToken');
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return; // Ensure we're on the client side
  localStorage.removeItem('jwtToken');
};