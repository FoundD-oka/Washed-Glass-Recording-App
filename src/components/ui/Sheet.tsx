import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, XIcon } from 'lucide-react';
interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onBack?: () => void;
}
const Sheet: React.FC<SheetProps> = ({
  open,
  onClose,
  title,
  children,
  onBack
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      // ボディのスクロールを無効化
      document.body.style.overflow = 'hidden';
    } else {
      // 少し遅延させてアニメーションを完了させる
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      // ボディのスクロールを有効化
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [open]);
  if (!open && !isAnimating) return null;
  return <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300" style={{
    opacity: open ? 1 : 0
  }} onClick={onClose}>
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white rounded-t-2xl shadow-xl transition-transform duration-300 overflow-hidden h-[70vh]" style={{
      transform: open ? 'translateY(0)' : 'translateY(100%)'
    }} onClick={e => e.stopPropagation()}>
        {title && <div className="flex items-center justify-between border-b border-gray-200 p-4">
            {onBack ? <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <ChevronLeftIcon size={18} className="text-gray-500" />
              </button> : <div className="w-8 h-8" />}
            <h2 className="text-lg font-medium text-gray-800">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <XIcon size={18} className="text-gray-500" />
            </button>
          </div>}
        <div className="overflow-y-auto h-[calc(70vh-60px)]">{children}</div>
      </div>
    </div>;
};
export default Sheet;