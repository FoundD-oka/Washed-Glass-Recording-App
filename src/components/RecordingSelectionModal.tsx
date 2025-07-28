import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import Button from './ui/Button';
interface RecordingSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  workflowType: string;
}
const RecordingSelectionModal: React.FC<RecordingSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  workflowType
}) => {
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const recordings = [{
    id: '1',
    name: 'Team Meeting Notes',
    duration: '32:15',
    date: 'Today, 2:30 PM'
  }, {
    id: '2',
    name: 'Interview with John',
    duration: '45:22',
    date: 'Yesterday, 10:15 AM'
  }, {
    id: '3',
    name: 'Project Brainstorm',
    duration: '15:47',
    date: '2 days ago'
  }];
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-[360px] shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">録音データを選択</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            {workflowType}に使用する録音データを選択してください
          </p>
          <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4">
            {recordings.map(recording => <div key={recording.id} className={`p-3 rounded-lg border ${selectedRecording === recording.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200'} cursor-pointer`} onClick={() => setSelectedRecording(recording.id)}>
                <div className="font-medium text-sm">{recording.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{recording.duration}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{recording.date}</span>
                </div>
              </div>)}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md" className="flex-1" onClick={onClose}>
              キャンセル
            </Button>
            <Button variant="primary" size="md" className="flex-1" onClick={onConfirm} disabled={!selectedRecording}>
              実行する
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default RecordingSelectionModal;