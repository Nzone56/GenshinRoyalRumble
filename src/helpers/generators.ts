export const generateId = (): string => {
  return `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};