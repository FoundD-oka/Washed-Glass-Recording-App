import React, { useState } from 'react';
import Sheet from './ui/Sheet';
import SettingsHome from './settings/pages/SettingsHome';
import AccountName from './settings/pages/AccountName';
import Words from './settings/pages/Words';
import SummaryTemplates from './settings/pages/SummaryTemplates';
import Storage from './settings/pages/Storage';
import Language from './settings/pages/Language';
import About from './settings/pages/About';
import BottomNav from './BottomNav';
interface SettingsSheetProps {
  open: boolean;
  onClose: () => void;
}
const SettingsSheet: React.FC<SettingsSheetProps> = ({
  open,
  onClose
}) => {
  const [currentPath, setCurrentPath] = useState('/settings');
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };
  const handleBack = () => {
    setCurrentPath('/settings');
  };
  const renderContent = () => {
    switch (currentPath) {
      case '/settings/account-name':
        return <AccountName />;
      case '/settings/words':
        return <Words />;
      case '/settings/summary-templates':
        return <SummaryTemplates />;
      case '/settings/storage':
        return <Storage />;
      case '/settings/language':
        return <Language />;
      case '/settings/about':
        return <About />;
      default:
        return <>
            <SettingsHome onNavigate={handleNavigate} />
            <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto">
              <BottomNav active="settings" />
            </div>
          </>;
    }
  };
  const isSubPage = currentPath !== '/settings';
  return <Sheet open={open} onClose={onClose} title={isSubPage ? getPageTitle(currentPath) : '設定'} onBack={isSubPage ? handleBack : undefined}>
      {renderContent()}
    </Sheet>;
};
// ページタイトルを取得する関数
function getPageTitle(path: string): string {
  switch (path) {
    case '/settings/account-name':
      return 'アカウント名';
    case '/settings/words':
      return '単語登録';
    case '/settings/summary-templates':
      return '要約の型';
    case '/settings/storage':
      return '保存先';
    case '/settings/language':
      return '表示言語';
    case '/settings/about':
      return 'RECO AI について';
    default:
      return '設定';
  }
}
export default SettingsSheet;