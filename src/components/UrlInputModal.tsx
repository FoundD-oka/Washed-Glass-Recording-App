import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { ExternalLinkIcon } from 'lucide-react';
interface UrlInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const UrlInputModal: React.FC<UrlInputModalProps> = ({
  isOpen,
  onClose
}) => {
  const [url, setUrl] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでURLを処理する
    console.log('Submitted URL:', url);
    setUrl('');
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="新規ワークの登録">
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          連携したいサービスのURLを入力してください。
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-xs font-medium text-gray-500 mb-1">
              URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ExternalLinkIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input type="url" id="url" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/70 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" size="md" onClick={onClose}>
              キャンセル
            </Button>
            <Button variant="primary" size="md" type="submit">
              登録する
            </Button>
          </div>
        </form>
      </div>
    </Modal>;
};
export default UrlInputModal;