import React from 'react';
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
}
const RecordingsList: React.FC<RecordingsListProps> = ({
  recordings,
  onDeleteRecording,
  onRenameRecording
}) => {
  return <div className="space-y-3">
      {recordings.length === 0 ? <div className="text-center py-8 text-gray-500">No recordings yet</div> : recordings.map((recording, index) => <RecordingItem key={recording.id} recording={recording} onDelete={onDeleteRecording} onRename={onRenameRecording} isUploaded={index === 0} />)}
    </div>;
};
export default RecordingsList;