import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { AuthProvider } from "../lib/context/auth-context";
import AuthModal from "../features/auth/auth-modal";
import Meta from "../components/shared/layout/meta";
import { config } from "../lib/services/utils";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <>
              <Meta />
              <Component {...pageProps} />
              <AuthModal />
              <ReactQueryDevtools />
            </>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
