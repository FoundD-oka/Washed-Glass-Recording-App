import React, { useEffect, useState } from 'react';
import RecorderControls from './RecorderControls';
import RecordingsList from './RecordingsList';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';
import WaveformVisualizer from './WaveformVisualizer';
import './RecorderApp.css';
import BottomNav from './BottomNav';
import SettingsSheet from './SettingsSheet';
import WorkflowSheet from './WorkflowSheet';
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
    tag: '会議'
  }, {
    id: '2',
    url: '#',
    name: 'Interview with John',
    duration: '45:22',
    date: 'Yesterday, 10:15 AM',
    tag: '商談'
  }, {
    id: '3',
    url: '#',
    name: 'Project Brainstorm',
    duration: '15:47',
    date: '2 days ago',
    tag: '1on1'
  }]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListExpanded, setIsListExpanded] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const tabs = ['会議', '商談', '1on1', 'ミーティング', '初回商談', 'プレゼン'];
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
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const handleDeleteRecording = (id: string) => {
    setRecordings(recordings.filter(recording => recording.id !== id));
  };
  const handleRenameRecording = (id: string, newName: string) => {
    setRecordings(recordings.map(recording => recording.id === id ? {
      ...recording,
      name: newName
    } : recording));
  };
  const toggleListVisibility = () => {
    setIsListExpanded(!isListExpanded);
  };
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const toggleWorkflow = () => {
    setIsWorkflowOpen(!isWorkflowOpen);
  };
  return <div className="w-full mx-auto flex flex-col h-screen max-w-[390px]">
      <div className="backdrop-blur-2xl bg-white/60 rounded-2xl shadow-xl overflow-hidden border border-white/50 flex-1 flex flex-col">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-700 inline-block text-transparent bg-clip-text">
                RECO AI
              </h1>
            </div>
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/70 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm" placeholder="検索..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="mb-1">
              <h2 className="text-xs text-gray-500">要約の型</h2>
            </div>
            <div className="mb-4 overflow-x-auto no-scrollbar">
              <div className="flex space-x-2 min-w-max">
                {tabs.map((tab, index) => <button key={index} className={`px-3 py-1.5 text-xs whitespace-nowrap rounded-full transition-colors ${activeTab === index ? 'bg-orange-600 text-white' : 'bg-white/50 text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab(index)}>
                    {tab}
                  </button>)}
              </div>
            </div>
            <div className="relative h-24 mb-4">
              {isRecording ? <WaveformVisualizer /> : <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <span className="text-xs">選択された型で要約します</span>
                </div>}
            </div>
            <div className={`text-xl font-medium mb-3 text-center ${isRecording ? 'text-gray-800' : 'text-gray-300'}`}>
              {isRecording ? formatTime(recordingTime) : '00:00'}
            </div>
          </div>
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
            <div className="pb-20"></div>
          </div>
          <BottomNav active="home" onHomeClick={toggleWorkflow} onSettingsClick={toggleSettings} isRecording={isRecording} recordingTime={recordingTime} toggleRecording={toggleRecording} formatTime={formatTime} />
        </div>
      </div>
      <SettingsSheet open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <WorkflowSheet open={isWorkflowOpen} onClose={() => setIsWorkflowOpen(false)} />
    </div>;
};
export default RecorderApp;