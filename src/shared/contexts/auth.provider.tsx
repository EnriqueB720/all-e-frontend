import React, { FC, useCallback, useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import AuthContext from './auth.context';

import { AuthCredentials, User, SignUpUser} from '@model';
import { AuthService } from '@services';
import { AuthProviderProps } from '@types';
import { useLoginLazyQuery, useSignupMutation, useRefreshUserLazyQuery } from '@generated';
import { StorageService } from '@services';
import { useTranslation } from '@hooks';


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const client = useApolloClient();

  const [user, setUser] = useState<User>();

  const [loginQuery] = useLoginLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [refreshUser] = useRefreshUserLazyQuery({
    fetchPolicy: 'cache-and-network'
  })

  const [signupQuery] = useSignupMutation();
  const { setLanguage } = useTranslation();


  useEffect(() => {

    const refreshUserTokenAsync = async () => {
      await refreshUserToken();
    }

    refreshUserTokenAsync();

  }, []);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  const login = useCallback(async ({ credentials }: AuthCredentials): Promise<boolean> => {
    try {
      const { email, password } = credentials;

      setIsLoading(true);
      setError(undefined);

      let { data, error } = await loginQuery({
        variables: {
          data: {
            email,
            password
          }
        }
      });

      if (error) {
        setIsLoading(false);
        const message = error.message || 'Login failed';
        setError(message);
        return false;
      }


      StorageService.setLanguage(data?.login.user.language!);
      setLanguage(data?.login.user.language!);

      StorageService.setJwtToken(data?.login!.access_token!);

      const user = new User(data?.login!.user!);
      setUser(user);

      setIsAuthenticated(true);
      return true;

    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || 'Login failed');
      return false;
    }
  }, [loginQuery, setIsLoading, setIsAuthenticated, setUser]);

  const register = useCallback(async ({ data }: SignUpUser): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(undefined);

      let result = await signupQuery({
        variables: {
          data
        }
      });

      if (result.errors) {
        const message = result.errors.map(e => e.message).join(', ');
        setError(message);
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      return true;

    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || 'Registration failed');
      return false;
    }
  }, [signupQuery, setIsLoading]);

  const logout = async () => {
    try {
      setIsLoading(true);

      await client.clearStore();
      await AuthService.logout();

      setIsAuthenticated(false);
    } catch (error) { }

    setIsLoading(false);
  };

  const refreshUserToken = useCallback(async () => {
    try {

      let token = await StorageService.getJwtToken();


      let { data } = await refreshUser({
        variables: {
          data: token
        }
      });

      if (data) {
        StorageService.setLanguage(data?.refreshUser.user.language!);
        setLanguage(data?.refreshUser.user.language!);

        StorageService.setJwtToken(data?.refreshUser!.access_token!);

        const user = new User(data?.refreshUser!.user!);
        setUser(user);

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(undefined);
      }

    } catch (error: any) {
      console.log(error.message)
    }
  }, [refreshUser, setIsAuthenticated, setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        error,
        login,
        register,
        logout,
        refreshUserToken,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
