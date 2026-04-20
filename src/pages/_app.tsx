import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, defaultSystem, Theme } from '@chakra-ui/react'
import AuthProvider from '@/shared/contexts/auth.provider'
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from "@apollo/client/react";
import { ColorModeProvider, useColorMode } from '@/shared/contexts/color-mode.context';
import '@/styles/globals.css';

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

function AppContent({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode();

  return (
    <Theme
      appearance={colorMode}
      className={colorMode === 'dark' ? 'app-bg-dark' : 'app-bg-light'}
      style={{ minHeight: '100vh' }}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Theme>
  );
}

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/faviconAllE.png" />
        <title>All-E</title>
      </Head>
      <ChakraProvider value={defaultSystem}>
        <ApolloProvider client={client}>
          <ColorModeProvider>
            <AppContent {...props} />
          </ColorModeProvider>
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}
