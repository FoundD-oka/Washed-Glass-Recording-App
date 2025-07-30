import React, { useEffect, useState } from 'react';
import { XIcon, WifiIcon, UploadCloudIcon } from 'lucide-react';
import Button from './ui/Button';
interface UploadProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const UploadProgressModal: React.FC<UploadProgressModalProps> = ({
  isOpen,
  onClose
}) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onClose]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-[360px] shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">アップロード中</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-full">
              <UploadCloudIcon className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm">
                録音データをアップロード中
              </h3>
              <p className="text-xs text-gray-500">
                アップロードが完了するまでお待ちください
              </p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>進行状況</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{
              width: `${progress}%`
            }}></div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <WifiIcon className="h-4 w-4 text-gray-500" />
              <div className="text-sm text-gray-700">Wi-Fi接続中</div>
            </div>
          </div>
          <Button variant="outline" size="md" className="w-full" onClick={onClose}>
            バックグラウンドで続行
          </Button>
        </div>
      </div>
    </div>;
};
export default UploadProgressModal;