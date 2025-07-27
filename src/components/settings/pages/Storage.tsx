import React from 'react';
import Button from '../../ui/Button';
import { CloudIcon } from 'lucide-react';
const Storage: React.FC = () => {
  const storageOptions = [{
    id: 1,
    name: 'GoogleDrive',
    icon: <CloudIcon className="h-5 w-5 text-blue-500" />
  }];
  return <div className="p-4">
      <h2 className="text-xs font-medium text-gray-500 mb-2">保存先</h2>
      <div className="space-y-3 mb-6">
        {storageOptions.map(option => <div key={option.id} className="p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm flex items-center">
            <div className="mr-3">{option.icon}</div>
            <div className="font-medium text-sm text-gray-800">
              {option.name}
            </div>
          </div>)}
      </div>
      <div className="fixed bottom-8 left-0 right-0 px-4 max-w-[390px] mx-auto">
        <Button variant="primary" size="lg" className="w-full py-3 rounded-xl text-base font-medium">
          新しい保存先を追加
        </Button>
      </div>
    </div>;
};
export default Storage;