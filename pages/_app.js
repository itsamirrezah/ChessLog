import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { AuthProvider } from "../lib/context/auth-context";
import AuthModal from "../features/auth/auth-modal";
import Meta from "../components/shared/layout/meta";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <>
              <Meta />
              {getLayout(<Component {...pageProps} />)} <ReactQueryDevtools />
              <AuthModal />
            </>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
