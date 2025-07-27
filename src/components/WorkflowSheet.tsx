import React, { useState } from 'react';
import Sheet from './ui/Sheet';
import Button from './ui/Button';
import { Mail, Database, ExternalLink, CheckIcon } from 'lucide-react';
import UrlInputModal from './UrlInputModal';
import RecordingSelectionModal from './RecordingSelectionModal';
import { useToast } from './ui/ToastProvider';
interface WorkflowSheetProps {
  open: boolean;
  onClose: () => void;
}
const WorkflowSheet: React.FC<WorkflowSheetProps> = ({
  open,
  onClose
}) => {
  const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);
  const [isRecordingSelectionOpen, setIsRecordingSelectionOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const {
    showToast
  } = useToast();
  const openUrlInput = () => {
    setIsUrlInputOpen(true);
  };
  const closeUrlInput = () => {
    setIsUrlInputOpen(false);
  };
  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setIsRecordingSelectionOpen(true);
  };
  const handleRecordingSelect = () => {
    setIsRecordingSelectionOpen(false);
    showToast('完了しました', 'success');
    onClose();
  };
  return <>
      <Sheet open={open} onClose={onClose} title="自動ワーク">
        <div className="p-4 space-y-4">
          <h2 className="text-xs font-medium text-gray-500 mb-2">
            ワークフロー
          </h2>
          {/* Workflow options */}
          <div className="space-y-3">
            <div className={`p-4 backdrop-blur-sm rounded-lg border shadow-sm flex items-center cursor-pointer transition-colors ${selectedWorkflow === 'email' ? 'bg-orange-50 border-orange-300' : 'bg-white/70 border-gray-200 hover:bg-orange-50/50'}`} onClick={() => handleWorkflowSelect('email')}>
              <div className="mr-3 p-2 bg-orange-100 rounded-full">
                <Mail className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">
                  お礼メールの作成
                </div>
                <div className="text-xs text-gray-500">
                  会話内容から自動的にお礼メールを作成します
                </div>
              </div>
              {selectedWorkflow === 'email' && <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>}
            </div>
            <div className={`p-4 backdrop-blur-sm rounded-lg border shadow-sm flex items-center cursor-pointer transition-colors ${selectedWorkflow === 'salesforce' ? 'bg-orange-50 border-orange-300' : 'bg-white/70 border-gray-200 hover:bg-orange-50/50'}`} onClick={() => handleWorkflowSelect('salesforce')}>
              <div className="mr-3 p-2 bg-orange-100 rounded-full">
                <Database className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">
                  Salesforceへ登録
                </div>
                <div className="text-xs text-gray-500">
                  会話内容をSalesforceに自動登録します
                </div>
              </div>
              {selectedWorkflow === 'salesforce' && <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>}
            </div>
          </div>
          <div className="fixed bottom-8 left-0 right-0 px-4 max-w-[390px] mx-auto">
            <Button variant="primary" size="lg" className="w-full py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2" onClick={openUrlInput}>
              <ExternalLink size={18} />
              新規ワークの登録
            </Button>
          </div>
        </div>
      </Sheet>
      <UrlInputModal isOpen={isUrlInputOpen} onClose={closeUrlInput} />
      <RecordingSelectionModal isOpen={isRecordingSelectionOpen} onClose={() => setIsRecordingSelectionOpen(false)} onConfirm={handleRecordingSelect} workflowType={selectedWorkflow === 'email' ? 'お礼メールの作成' : 'Salesforceへ登録'} />
    </>;
};
export default WorkflowSheet;