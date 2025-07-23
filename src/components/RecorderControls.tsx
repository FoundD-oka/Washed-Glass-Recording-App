import React from 'react';
import { PlusIcon, StopCircleIcon } from 'lucide-react';
interface RecorderControlsProps {
  isRecording: boolean;
  recordingTime: number;
  toggleRecording: () => void;
  formatTime: (seconds: number) => string;
}
const RecorderControls: React.FC<RecorderControlsProps> = ({
  isRecording,
  recordingTime,
  toggleRecording,
  formatTime
}) => {
  return <button onClick={toggleRecording} className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg backdrop-blur-md border border-white/30 ${isRecording ? 'bg-gradient-to-br from-gray-400/90 to-gray-600/90 hover:from-gray-500/90 hover:to-gray-700/90' : 'bg-gradient-to-br from-blue-400/90 to-blue-600/90 hover:from-blue-500/90 hover:to-blue-700/90'}`}>
      {isRecording ? <StopCircleIcon className="h-7 w-7 text-white" /> : <PlusIcon className="h-8 w-8 text-white" />}
    </button>;
};
export default RecorderControls;