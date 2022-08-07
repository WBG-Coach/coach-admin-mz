import { User } from "../store/type";

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

// @coach:user
export const setLocalUser = (user: User): void => {
  localStorage.setItem("@coach:user", JSON.stringify(user));
};
export const getLocalUser = (): User | null => {
  const localUser = localStorage.getItem("@coach:user");
  if (!localUser) return null;
  return JSON.parse(localUser);
};

// @coach:language
export const setLocalLanguage = (language: string): void => {
  localStorage.setItem("@coach:language", language);
};

export const getLocalLanguage = (): string => {
  const localLanguage = localStorage.getItem("@coach:language");
  if (!localLanguage) return "en-US";
  return localLanguage;
};
