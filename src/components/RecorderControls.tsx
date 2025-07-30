import React from 'react';
import { PlusIcon, StopCircleIcon } from 'lucide-react';
interface RecorderControlsProps {
  isRecording: boolean;
  recordingTime: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  formatTime: (seconds: number) => string;
}
const RecorderControls: React.FC<RecorderControlsProps> = ({
  isRecording,
  recordingTime,
  onStartRecording,
  onStopRecording,
  formatTime
}) => {
  const handleClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return <button onClick={handleClick} className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg backdrop-blur-md border border-white/30 z-[70] ${isRecording ? 'bg-gradient-to-br from-gray-400/90 to-gray-600/90 hover:from-gray-500/90 hover:to-gray-700/90' : 'bg-gradient-to-br from-orange-400/90 to-orange-600/90 hover:from-orange-500/90 hover:to-orange-700/90'}`}>
      {isRecording ? <StopCircleIcon className="h-7 w-7 text-white" /> : <PlusIcon className="h-8 w-8 text-white" />}
    </button>;
};
export default RecorderControls;