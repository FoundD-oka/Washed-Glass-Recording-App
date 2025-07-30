import React, { useEffect, useState, createContext, useContext } from 'react';
import Toast from './Toast';
type ToastType = 'success' | 'error' | 'info';
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}
interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}
const ToastContext = createContext<ToastContextType>({
  showToast: () => {}
});
export const useToast = () => useContext(ToastContext);
interface ToastProviderProps {
  children: ReactNode;
}
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, {
      id,
      message,
      type
    }]);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  return <ToastContext.Provider value={{
    showToast
  }}>
      {children}
      <div className="fixed bottom-20 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-50">
        {toasts.map(toast => <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />)}
      </div>
    </ToastContext.Provider>;
};