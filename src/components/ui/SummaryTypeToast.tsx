import React from 'react';
import { InfoIcon, XIcon } from 'lucide-react';
interface SummaryTypeToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  items: {
    id: string;
    name: string;
  }[];
  onSelect: (selectedItem: string) => void;
  onClose: () => void;
}
const SummaryTypeToast: React.FC<SummaryTypeToastProps> = ({
  message,
  type = 'info',
  items,
  onSelect,
  onClose
}) => {
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
  return <div className={`${getBackgroundColor()} text-white px-4 py-3 rounded-lg shadow-lg max-w-[300px] animate-fade-in pointer-events-auto`} style={{
    animationDuration: '0.3s'
  }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5 text-white" />
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
      <div className="space-y-1 mt-2">
        {items.map(item => <button key={item.id} className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors" onClick={() => onSelect(item.id)}>
            {item.name}
          </button>)}
      </div>
    </div>;
};
export default SummaryTypeToast;