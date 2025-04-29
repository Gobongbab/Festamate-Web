import './index.css';
import '@/app/fcm';
import '@stackflow/plugin-basic-ui/index.css';

import { Provider } from 'jotai';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider>
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <App />
    </QueryClientProvider>
  </Provider>,
);
