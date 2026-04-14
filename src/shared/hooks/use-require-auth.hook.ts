import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '@contexts';

export function useRequireAuth(redirectTo: string = '/login') {
  const { isAuthenticated, isInitializing, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated) router.replace(redirectTo);
  }, [isAuthenticated, isInitializing, redirectTo, router]);

  return {
    isAuthenticated,
    isInitializing,
    user,
    isReady: !isInitializing && isAuthenticated,
  };
}

export default useRequireAuth;
