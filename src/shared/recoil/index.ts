import { atom } from 'recoil';

import { Constants, GlobalState } from '@constants';

import { LanguageState, UserState } from '@types';

export const languageState = atom<LanguageState>({
  key: GlobalState.LANGUAGE,
  default: Constants.DEFAULT_LANGUAGE,
});

export const userState = atom<UserState>({
  key: GlobalState.USER,
  default: undefined,
});

export const RecoilStateDictionary = {
  [GlobalState.USER]: userState,
  [GlobalState.LANGUAGE]: languageState
}