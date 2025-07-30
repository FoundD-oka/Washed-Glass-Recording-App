import React, { useState } from 'react';
import RecordingItem from './RecordingItem';
interface RecordingsListProps {
  recordings: {
    id: string;
    url: string;
    name: string;
    duration: string;
    date: string;
    tag?: string;
  }[];
  onDeleteRecording?: (id: string) => void;
  onRenameRecording?: (id: string, newName: string) => void;
  onSelectRecording?: (id: string) => void;
}
const RecordingsList: React.FC<RecordingsListProps> = ({
  recordings,
  onDeleteRecording,
  onRenameRecording,
  onSelectRecording
}) => {
  const [uploadStatus, setUploadStatus] = useState<Record<string, 'success' | 'failed' | 'none'>>({
    '1': 'success',
    '2': 'failed',
    '3': 'none' // Project Brainstorm - not uploaded
  });
  const handleUpload = (id: string) => {
    // Update upload status to success
    setUploadStatus(prev => ({
      ...prev,
      [id]: 'success'
    }));
  };
  return <div className="space-y-3">
      {recordings.length === 0 ? <div className="text-center py-8 text-gray-500">No recordings yet</div> : recordings.map(recording => <RecordingItem key={recording.id} recording={recording} onDelete={onDeleteRecording} onRename={onRenameRecording} isUploaded={uploadStatus[recording.id] === 'success'} isUploadFailed={uploadStatus[recording.id] === 'failed'} onUpload={handleUpload} onSelect={onSelectRecording} />)}
    </div>;
};
export default RecordingsList;