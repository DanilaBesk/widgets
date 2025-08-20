import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import AppRouter from './router.tsx';
import { StrictMode } from 'react';
import { Toaster } from './config/sonner.tsx';
import { DataProvider } from './store/data/provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Toaster />
      <AppRouter />
    </DataProvider>
  </StrictMode>,
);
