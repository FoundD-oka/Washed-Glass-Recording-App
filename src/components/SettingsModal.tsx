import React, { useState } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import Modal from './ui/Modal';
import Section from './settings/Section';
import ListTile from './settings/ListTile';
import SubList from './settings/SubList';
import Divider from './settings/Divider';
import Switch from './ui/Switch';
import Button from './ui/Button';
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [wifiOnly, setWifiOnly] = useState(true);
  const [autoUpload, setAutoUpload] = useState(true);
  return <Modal isOpen={isOpen} onClose={onClose} title="設定">
      <div className="pb-4">
        {/* アカウント情報 */}
        <Section title="アカウント情報">
          <ListTile label="アカウント名" value="Link AI" trailing={<ChevronRight size={16} />} />
        </Section>
        <Divider />
        {/* ワークスペース */}
        <Section title="ワークスペース">
          <ListTile label="単語登録" trailing={<Button variant="secondary" size="sm">
                追加
              </Button>} />
          <SubList>
            <ListTile label="要約の型" trailing={<ChevronRight size={16} />} />
            <SubList>
              <ListTile label="型のフォーマット" />
              <ListTile label="型を追加する" />
            </SubList>
            <ListTile label="保存先" trailing={<ChevronRight size={16} />} />
            <SubList>
              <ListTile label="Google Drive" />
              <ListTile label="保存先を追加する" />
            </SubList>
          </SubList>
        </Section>
        <Divider />
        {/* 一般設定 */}
        <Section title="一般設定">
          <ListTile label="Wifi接続時のみアップロード" trailing={<Switch defaultChecked={wifiOnly} onChange={setWifiOnly} />} />
          <ListTile label="自動アップロード" trailing={<Switch defaultChecked={autoUpload} onChange={setAutoUpload} />} />
          <ListTile label="表示言語" value="日本語" trailing={<ChevronRight size={16} />} />
          <ListTile label="文字サイズ" value="12pt" trailing={<ChevronRight size={16} />} />
        </Section>
        <Divider />
        {/* その他 */}
        <Section title="その他">
          <ListTile destructive label="キャッシュの削除" trailing={<Trash2 size={16} className="text-red-500" />} />
          <ListTile label="RECO AI について" value="ver0.01" trailing={<ChevronRight size={16} />} />
        </Section>
      </div>
    </Modal>;
};
export default SettingsModal;