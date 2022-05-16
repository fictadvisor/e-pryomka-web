import '../styles/global.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../lib/context/AuthenticationContext';

const queryClient = new QueryClient();

export default function Application({ Component, pageProps }) {
    return (
      <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
              <Component {...pageProps} />
          </AuthenticationProvider>
      </QueryClientProvider>
    );
};
