import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageSelector } from './components/LanguageSelector';
import { Dashboard } from './components/Dashboard';
import './i18n/i18n';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <LanguageSelector />
        <div className="container mx-auto px-4 py-8">
          <Dashboard />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;