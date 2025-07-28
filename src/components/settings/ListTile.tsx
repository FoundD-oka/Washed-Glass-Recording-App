import React from 'react';
import { ChevronRight } from 'lucide-react';
interface ListTileProps {
  label: string;
  value?: string;
  href?: string;
  trailing?: React.ReactNode;
  destructive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
const ListTile: React.FC<ListTileProps> = ({
  label,
  value,
  href,
  trailing,
  destructive = false,
  onClick,
  children
}) => {
  const content = <div className={`flex items-center justify-between py-3 px-4 ${href || onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`} onClick={onClick}>
      <div className="flex-1">
        <span className={`text-sm ${destructive ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
          {label}
        </span>
      </div>
      <div className="flex items-center">
        {value && <span className="text-sm text-gray-500 mr-2">{value}</span>}
        {children && <div className="ml-2">{children}</div>}
        {trailing && <div className="ml-2">{trailing}</div>}
        {href && <ChevronRight size={16} className="text-gray-400 ml-2" />}
      </div>
    </div>;
  if (href) {
    return <div onClick={() => {
      // ここでは単純なクリックハンドラーを実装
      // 実際のルーティングはSettingsSheetで行う
      if (onClick) onClick();
    }}>
        {content}
      </div>;
  }
  return content;
};
export default ListTile;