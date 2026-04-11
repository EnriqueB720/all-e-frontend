import { atom } from 'jotai';
import { Constants } from '@constants';
import { LanguageState, UserState } from '@types';
import { Language } from '@generated';

const getStoredLanguage = (): LanguageState => {
  if (typeof window === 'undefined') return Constants.DEFAULT_LANGUAGE;
  const stored = localStorage.getItem('@language') as Language | null;
  return stored || Constants.DEFAULT_LANGUAGE;
};

export const languageState = atom<LanguageState>(getStoredLanguage());
export const userState = atom<UserState | undefined>(undefined);
