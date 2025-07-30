import React, { useEffect, useState, createContext, useContext } from 'react';
import Toast from './Toast';
import SummaryTypeToast from './SummaryTypeToast';
type ToastType = 'success' | 'error' | 'info';
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  action?: () => void;
  isCustom?: boolean;
  customData?: any;
  onCustomAction?: (selectedItem: string) => void;
}
interface ToastContextType {
  showToast: (message: string, type: ToastType, action?: () => void) => void;
  showCustomToast: (message: string, type: ToastType, items: {
    id: string;
    name: string;
  }[], onSelect: (selectedItem: string) => void) => void;
}
const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  showCustomToast: () => {}
});
export const useToast = () => useContext(ToastContext);
interface ToastProviderProps {
  children: React.ReactNode;
}
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const showToast = (message: string, type: ToastType = 'info', action?: () => void) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, {
      id,
      message,
      type,
      action,
      isCustom: false
    }]);
  };
  const showCustomToast = (message: string, type: ToastType = 'info', items: {
    id: string;
    name: string;
  }[], onSelect: (selectedItem: string) => void) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, {
      id,
      message,
      type,
      isCustom: true,
      customData: items,
      onCustomAction: onSelect
    }]);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  return <ToastContext.Provider value={{
    showToast,
    showCustomToast
  }}>
      {children}
      <div className="fixed bottom-20 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-50">
        {toasts.map(toast => toast.isCustom ? <SummaryTypeToast key={toast.id} message={toast.message} type={toast.type} items={toast.customData} onSelect={selectedItem => {
        if (toast.onCustomAction) {
          toast.onCustomAction(selectedItem);
        }
        removeToast(toast.id);
      }} onClose={() => removeToast(toast.id)} /> : <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} action={toast.action} />)}
      </div>
    </ToastContext.Provider>;
};