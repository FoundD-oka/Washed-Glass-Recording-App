import React, { useState } from 'react';
const Language: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('日本語');
  const languages = [{
    code: 'ja',
    name: '日本語'
  }, {
    code: 'en',
    name: 'English (英語)'
  }, {
    code: 'zh-CN',
    name: '简体中文 (中国語簡体字)'
  }, {
    code: 'zh-TW',
    name: '繁體中文 (中国語繁体字)'
  }, {
    code: 'ko',
    name: '한국어 (韓国語)'
  }, {
    code: 'fr',
    name: 'Français (フランス語)'
  }, {
    code: 'de',
    name: 'Deutsch (ドイツ語)'
  }, {
    code: 'es',
    name: 'Español (スペイン語)'
  }, {
    code: 'it',
    name: 'Italiano (イタリア語)'
  }, {
    code: 'pt',
    name: 'Português (ポルトガル語)'
  }, {
    code: 'ru',
    name: 'Русский (ロシア語)'
  }, {
    code: 'ar',
    name: 'العربية (アラビア語)'
  }, {
    code: 'hi',
    name: 'हिन्दी (ヒンディー語)'
  }, {
    code: 'th',
    name: 'ไทย (タイ語)'
  }, {
    code: 'vi',
    name: 'Tiếng Việt (ベトナム語)'
  }, {
    code: 'id',
    name: 'Bahasa Indonesia (インドネシア語)'
  }, {
    code: 'ms',
    name: 'Bahasa Melayu (マレー語)'
  }, {
    code: 'nl',
    name: 'Nederlands (オランダ語)'
  }, {
    code: 'sv',
    name: 'Svenska (スウェーデン語)'
  }, {
    code: 'tr',
    name: 'Türkçe (トルコ語)'
  }, {
    code: 'pl',
    name: 'Polski (ポーランド語)'
  }];
  return <div className="p-4">
      <h2 className="text-xs font-medium text-gray-500 mb-2">表示言語</h2>
      <div className="space-y-2">
        {languages.map(language => <div key={language.code} className={`p-3 rounded-lg border ${selectedLanguage === language.name ? 'bg-blue-50 border-blue-200' : 'bg-white/70 border-gray-200'}`} onClick={() => setSelectedLanguage(language.name)}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">{language.name}</span>
              {selectedLanguage === language.name && <div className="w-4 h-4 rounded-full bg-blue-500"></div>}
            </div>
          </div>)}
      </div>
    </div>;
};
export default Language;