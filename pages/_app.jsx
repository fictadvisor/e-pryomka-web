import '../styles/global.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../lib/context/AuthenticationContext';
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

export default function Application({ Component, pageProps }) {
    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AuthenticationProvider>
              <Component {...pageProps} />
          </AuthenticationProvider>
        </RecoilRoot>
      </QueryClientProvider>
    );
};
