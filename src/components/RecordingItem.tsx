import React, { useState } from 'react';
import { PlayIcon, MoreVerticalIcon, FileIcon, Pencil, Trash2, CloudUploadIcon, EditIcon, CheckCircleIcon, UsersIcon, BriefcaseIcon, UserIcon, CalendarIcon, PresentationIcon, UserPlusIcon } from 'lucide-react';
interface RecordingItemProps {
  recording: {
    id: string;
    url: string;
    name: string;
    duration: string;
    date: string;
    tag?: string;
  };
  onDelete?: (id: string) => void;
  onRename?: (id: string, newName: string) => void;
  isUploaded?: boolean;
}
const RecordingItem: React.FC<RecordingItemProps> = ({
  recording,
  onDelete,
  onRename,
  isUploaded = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(recording.name);
  const handleRename = () => {
    if (onRename && newName.trim()) {
      onRename(recording.id, newName);
      setIsRenaming(false);
    }
    setIsMenuOpen(false);
  };
  const handleDelete = () => {
    if (onDelete) {
      onDelete(recording.id);
    }
    setIsMenuOpen(false);
  };
  const handleEdit = () => {
    // Handle edit functionality
    console.log('Editing recording:', recording.id);
    setIsMenuOpen(false);
  };
  const handleUpload = () => {
    // Handle cloud upload functionality
    console.log('Uploading recording to cloud:', recording.id);
  };
  const getTagIcon = () => {
    switch (recording.tag) {
      case '会議':
        return <UsersIcon className="h-4 w-4 text-gray-500" />;
      case '商談':
        return <BriefcaseIcon className="h-4 w-4 text-gray-500" />;
      case '1on1':
        return <UserIcon className="h-4 w-4 text-gray-500" />;
      case 'ミーティング':
        return <CalendarIcon className="h-4 w-4 text-gray-500" />;
      case '初回商談':
        return <UserPlusIcon className="h-4 w-4 text-gray-500" />;
      case 'プレゼン':
        return <PresentationIcon className="h-4 w-4 text-gray-500" />;
      default:
        return <FileIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  return <div className="backdrop-blur-sm bg-white/40 rounded-xl p-3 border border-white/50 hover:bg-white/60 transition-all duration-300 group relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-white/70 shadow-sm">
            {getTagIcon()}
          </div>
          {isRenaming ? <div className="flex-1">
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm" autoFocus onBlur={handleRename} onKeyDown={e => e.key === 'Enter' && handleRename()} />
            </div> : <div className="flex-1 min-w-0">
              <h3 className="text-gray-800 font-medium text-sm truncate">
                {recording.name}
              </h3>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span>{recording.duration}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="truncate">{recording.date}</span>
              </div>
              {recording.tag && <div className="mt-1">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {recording.tag}
                  </span>
                </div>}
            </div>}
        </div>
        <div className="flex items-center gap-1 relative z-10">
          <button className="w-7 h-7 rounded-full bg-gray-500 flex items-center justify-center">
            <PlayIcon className="h-3 w-3 text-white" />
          </button>
          <button className={`w-7 h-7 rounded-full flex items-center justify-center ${isUploaded ? 'bg-gray-300 cursor-default' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={!isUploaded ? handleUpload : undefined} title={isUploaded ? 'アップロード済み' : 'アップロード'}>
            {isUploaded ? <CheckCircleIcon className="h-3 w-3 text-white" /> : <CloudUploadIcon className="h-3 w-3 text-white" />}
          </button>
          <div className="relative">
            <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MoreVerticalIcon className="h-3 w-3 text-gray-500" />
            </button>
            {isMenuOpen && <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg z-[100] py-1 border border-gray-100">
                <button className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleEdit}>
                  <EditIcon className="h-3 w-3" />
                  編集
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => {
              setIsRenaming(true);
              setIsMenuOpen(false);
            }}>
                  <Pencil className="h-3 w-3" />
                  名前変更
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-gray-100 w-full text-left" onClick={handleDelete}>
                  <Trash2 className="h-3 w-3" />
                  削除
                </button>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default RecordingItem;