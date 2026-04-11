import { createContext } from 'react';

import { AuthCredentials, User, SignUpUser } from '@model';

export interface IAuthContext {
  user?: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  error?: string;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (values: SignUpUser) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUserToken: () => Promise<void>;
  clearError: () => void;
}

export default createContext<IAuthContext>({
  user: undefined,
  isLoading: false,
  isAuthenticated: false,
  error: undefined,
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  refreshUserToken: () => Promise.resolve(),
  clearError: () => {},
});
