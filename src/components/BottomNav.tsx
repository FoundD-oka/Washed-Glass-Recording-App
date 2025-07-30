import React from 'react';
import { FolderIcon, SettingsIcon } from 'lucide-react';
import RecorderControls from './RecorderControls';
interface BottomNavProps {
  active: 'home' | 'settings';
  onHomeClick?: () => void;
  onSettingsClick?: () => void;
  isRecording?: boolean;
  recordingTime?: number;
  toggleRecording?: () => void;
  formatTime?: (seconds: number) => string;
}
const BottomNav: React.FC<BottomNavProps> = ({
  active,
  onHomeClick = () => {},
  onSettingsClick = () => {},
  isRecording = false,
  recordingTime = 0,
  toggleRecording = () => {},
  formatTime = seconds => `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`
}) => {
  return <div className="bg-white/40 backdrop-blur-sm rounded-t-3xl py-4 px-6 shadow-inner fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto border-t border-white/30">
      <div className="flex items-center justify-between relative">
        {/* Home button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={onHomeClick}>
          <FolderIcon className={`h-6 w-6 ${active === 'home' ? 'text-orange-500' : 'text-gray-500'}`} />
          <span className={`text-xs ${active === 'home' ? 'text-orange-500' : 'text-gray-500'} mt-1`}>
            自動ワーク
          </span>
        </div>
        {/* Record button */}
        {active === 'home' && <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-50">
            <RecorderControls isRecording={isRecording} recordingTime={recordingTime} toggleRecording={toggleRecording} formatTime={formatTime} />
          </div>}
        {/* Settings button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={onSettingsClick}>
          <SettingsIcon className={`h-6 w-6 ${active === 'settings' ? 'text-orange-500' : 'text-gray-500'}`} />
          <span className={`text-xs ${active === 'settings' ? 'text-orange-500' : 'text-gray-500'} mt-1`}>
            設定
          </span>
        </div>
      </div>
    </div>;
};
export default BottomNav;