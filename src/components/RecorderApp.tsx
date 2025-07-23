import React, { useEffect, useState } from 'react';
import RecorderControls from './RecorderControls';
import RecordingsList from './RecordingsList';
import { FolderIcon, SettingsIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';
import WaveformVisualizer from './WaveformVisualizer';
import './RecorderApp.css';
const RecorderApp = () => {
  const [recordings, setRecordings] = useState<{
    id: string;
    url: string;
    name: string;
    duration: string;
    date: string;
    tag?: string;
  }[]>([{
    id: '1',
    url: '#',
    name: 'Team Meeting Notes',
    duration: '32:15',
    date: 'Today, 2:30 PM',
    tag: '客先ヒアリング'
  }, {
    id: '2',
    url: '#',
    name: 'Interview with John',
    duration: '45:22',
    date: 'Yesterday, 10:15 AM',
    tag: '設計書のレビュー'
  }, {
    id: '3',
    url: '#',
    name: 'Project Brainstorm',
    duration: '15:47',
    date: '2 days ago',
    tag: 'マーケティング資料作成'
  }]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListExpanded, setIsListExpanded] = useState(true);
  const tabs = ['客先ヒアリング', '設計書のレビュー', 'マーケティング資料作成', '品質管理マニュアル更新'];
  // Simulate starting/stopping recording
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      // In a real app, we would start the actual recording here
    } else {
      setIsRecording(false);
      // In a real app, we would stop the recording and save it
      const newRecording = {
        id: Date.now().toString(),
        url: '#',
        name: `New Recording ${recordings.length + 1}`,
        duration: formatTime(recordingTime),
        date: 'Just now',
        tag: tabs[activeTab]
      };
      setRecordings([newRecording, ...recordings]);
    }
  };
  // Format seconds into MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  // Update timer while recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  // Handle deleting a recording
  const handleDeleteRecording = (id: string) => {
    setRecordings(recordings.filter(recording => recording.id !== id));
  };
  // Handle renaming a recording
  const handleRenameRecording = (id: string, newName: string) => {
    setRecordings(recordings.map(recording => recording.id === id ? {
      ...recording,
      name: newName
    } : recording));
  };
  // Toggle recordings list visibility
  const toggleListVisibility = () => {
    setIsListExpanded(!isListExpanded);
  };
  return <div className="w-full mx-auto flex flex-col h-screen max-w-[390px]">
      <div className="backdrop-blur-2xl bg-white/60 rounded-2xl shadow-xl overflow-hidden border border-white/50 flex-1 flex flex-col">
        {/* Main container with fixed height */}
        <div className="flex flex-col h-full">
          {/* Fixed header area - not scrollable */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-1.5 rounded-lg">
                <div className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-700 inline-block text-transparent bg-clip-text">
                Reco AI
              </h1>
            </div>
            {/* Search Bar */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/70 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm" placeholder="検索..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {/* Tabs */}
            <div className="mb-4 overflow-x-auto no-scrollbar">
              <div className="flex space-x-2 min-w-max">
                {tabs.map((tab, index) => <button key={index} className={`px-3 py-1.5 text-xs whitespace-nowrap rounded-full transition-colors ${activeTab === index ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab(index)}>
                    {tab}
                  </button>)}
              </div>
            </div>
            <div className="relative h-24 mb-4">
              {isRecording ? <WaveformVisualizer /> : <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <span className="text-xs">Press + to start</span>
                </div>}
            </div>
            <div className={`text-xl font-medium mb-3 text-center ${isRecording ? 'text-gray-800' : 'text-gray-300'}`}>
              {isRecording ? formatTime(recordingTime) : '00:00'}
            </div>
          </div>
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-4 relative">
            <div className={`mt-2 recordings-container ${isListExpanded ? 'expanded' : 'collapsed'}`}>
              <div className={`flex items-center justify-between mb-3 recordings-header ${isListExpanded ? '' : 'collapsed-header'}`}>
                <button className="flex items-center gap-1 focus:outline-none" onClick={toggleListVisibility}>
                  <ChevronDownIcon className={`h-4 w-4 text-gray-700 transition-transform duration-300 ${isListExpanded ? '' : '-rotate-90'}`} />
                  <h2 className="text-base font-medium text-gray-700">
                    すべての録音
                  </h2>
                </button>
                <span className="text-xs text-gray-500">
                  {recordings.length} recordings
                </span>
              </div>
              <div className={`recordings-list ${isListExpanded ? 'visible' : 'hidden'}`}>
                <RecordingsList recordings={recordings} onDeleteRecording={handleDeleteRecording} onRenameRecording={handleRenameRecording} />
              </div>
            </div>
            {/* Add padding at the bottom to ensure content doesn't get hidden behind the footer */}
            <div className="pb-20"></div>
          </div>
          {/* Footer - fixed at the bottom */}
          <div className="bg-gray-80 rounded-t-3xl py-4 px-6 shadow-inner mt-auto">
            <div className="flex items-center justify-between relative">
              {/* Home button */}
              <div className="flex flex-col items-center">
                <FolderIcon className="h-6 w-6 text-blue-500" />
                <span className="text-xs text-blue-500 mt-1">ホーム</span>
              </div>
              {/* Record button */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0">
                <RecorderControls isRecording={isRecording} recordingTime={recordingTime} toggleRecording={toggleRecording} formatTime={formatTime} />
              </div>
              {/* Settings button */}
              <div className="flex flex-col items-center">
                <SettingsIcon className="h-6 w-6 text-gray-500" />
                <span className="text-xs text-gray-500 mt-1">設定</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default RecorderApp;