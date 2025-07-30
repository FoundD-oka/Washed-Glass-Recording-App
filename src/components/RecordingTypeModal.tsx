import React from 'react';
import Modal from './ui/Modal';

interface RecordingTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
  types: string[];
}

const RecordingTypeModal: React.FC<RecordingTypeModalProps> = ({
  isOpen,
  onClose,
  onSelectType,
  types
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="議事録の種類を選択">
      <div className="p-3">
        <p className="text-xs text-gray-600 mb-3">議事録の種類を選択してください。</p>
        
        <div className="max-h-48 overflow-y-auto space-y-2">
          {types.map((type, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 cursor-pointer transition-all duration-200"
              onClick={() => onSelectType(type)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800">{type}</span>
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RecordingTypeModal; 