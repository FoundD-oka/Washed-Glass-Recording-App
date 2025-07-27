import React from 'react';
import RecorderApp from './components/RecorderApp';
import { ToastProvider } from './components/ui/ToastProvider';
export function App() {
  return <ToastProvider>
      <div className="flex w-full min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <RecorderApp />
      </div>
    </ToastProvider>;
}