import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InfoIcon, XIcon } from 'lucide-react';
import Button from './Button';
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
  action?: () => void;
}
const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
  action
}) => {
  useEffect(() => {
    if (!action) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration, action]);
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
  const handleAction = () => {
    if (action) {
      action();
      onClose();
    }
  };
  return <div className={`${getBackgroundColor()} text-white px-4 py-3 rounded-lg shadow-lg max-w-[300px] animate-fade-in pointer-events-auto`} style={{
    animationDuration: '0.3s'
  }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <div className="flex items-center gap-2">
          {action && <Button variant="outline" size="sm" className="text-xs text-white border-white/30 hover:bg-white/20 py-0.5 px-2" onClick={handleAction}>
              OK
            </Button>}
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <XIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>;
};
export default Toast;