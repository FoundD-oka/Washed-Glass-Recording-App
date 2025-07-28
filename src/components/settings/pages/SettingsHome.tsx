import React from 'react';
import Section from '../Section';
import ListTile from '../ListTile';
import Switch from '../../ui/Switch';
interface SettingsHomeProps {
  onNavigate: (path: string) => void;
  onClearCache?: () => void;
}
const SettingsHome: React.FC<SettingsHomeProps> = ({
  onNavigate,
  onClearCache = () => {}
}) => {
  return <div className="pb-16">
      <Section title="アカウント情報">
        <ListTile label="アカウント名" value="Link AI" href="/settings/account-name" onClick={() => onNavigate('/settings/account-name')} />
      </Section>
      <Section title="ワークスペース">
        <ListTile label="単語登録" href="/settings/words" onClick={() => onNavigate('/settings/words')} />
        <ListTile label="要約の型" href="/settings/summary-templates" onClick={() => onNavigate('/settings/summary-templates')} />
        <ListTile label="保存先" href="/settings/storage" onClick={() => onNavigate('/settings/storage')} />
      </Section>
      <Section title="一般設定">
        <ListTile label="Wifi接続時のみアップロード">
          <Switch defaultChecked />
        </ListTile>
        <ListTile label="表示言語" value="日本語" href="/settings/language" onClick={() => onNavigate('/settings/language')} />
      </Section>
      <Section title="その他">
        <ListTile destructive label="キャッシュの削除" onClick={onClearCache} />
        <ListTile label="RECO AI について" value="ver0.01" href="/settings/about" onClick={() => onNavigate('/settings/about')} />
      </Section>
    </div>;
};
export default SettingsHome;