import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);
  if (!isOpen && !isAnimating) return null;
  return <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
      <div className={`w-full max-w-[390px] max-h-[90vh] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`} onClick={e => e.stopPropagation()}>
        {title && <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-800">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <XIcon size={18} className="text-gray-500" />
            </button>
          </div>}
        <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
          {children}
        </div>
      </div>
    </div>;
};
export default Modal;