import type { AppProps } from 'next/app'
import { ChakraProvider, defaultSystem, Theme } from '@chakra-ui/react'
import AuthProvider from '@/shared/contexts/auth.provider'
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from "@apollo/client/react";
import { ColorModeProvider, useColorMode } from '@/shared/contexts/color-mode.context';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { wagmiConfig } from '@/shared/blockchain/config';

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('@token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

function AppContent({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode();

  return (
    <RainbowKitProvider theme={colorMode === 'dark' ? darkTheme() : lightTheme()}>
      <Theme appearance={colorMode} style={{ minHeight: '100vh' }}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Theme>
    </RainbowKitProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ApolloProvider client={client}>
            <ColorModeProvider>
              <AppContent {...props} />
            </ColorModeProvider>
          </ApolloProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
