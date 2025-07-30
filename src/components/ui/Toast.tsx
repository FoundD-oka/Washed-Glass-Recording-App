import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InfoIcon, XIcon } from 'lucide-react';
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}
const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-white" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-white" />;
      case 'info':
        return <InfoIcon className="h-5 w-5 text-white" />;
    }
  };
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }
  };
  return <div className={`${getBackgroundColor()} text-white px-4 py-3 rounded-lg shadow-lg max-w-[300px] animate-fade-in flex items-center justify-between pointer-events-auto`} style={{
    animationDuration: '0.3s'
  }}>
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
        <XIcon className="h-4 w-4 text-white" />
      </button>
    </div>;
};
export default Toast;