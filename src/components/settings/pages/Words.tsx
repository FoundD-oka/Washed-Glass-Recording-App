import React from 'react';
import Button from '../../ui/Button';
const Words: React.FC = () => {
  const dummyWords = [{
    id: 1,
    word: 'アジャイル',
    meaning: 'ソフトウェア開発手法の一種'
  }, {
    id: 2,
    word: 'スクラム',
    meaning: 'アジャイル開発の実践方法'
  }, {
    id: 3,
    word: 'スプリント',
    meaning: '決められた期間内での開発サイクル'
  }, {
    id: 4,
    word: 'バックログ',
    meaning: '未完了の作業項目のリスト'
  }, {
    id: 5,
    word: 'リファクタリング',
    meaning: 'コードの内部構造を改善する作業'
  }];
  return <div className="p-4">
      <h2 className="text-xs font-medium text-gray-500 mb-2">単語登録</h2>
      <div className="space-y-3 mb-6">
        {dummyWords.map(word => <div key={word.id} className="p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
            <div className="font-medium text-sm text-gray-800">{word.word}</div>
            <div className="text-sm text-gray-600 mt-1">{word.meaning}</div>
          </div>)}
      </div>
      <div className="fixed bottom-8 left-0 right-0 px-4 max-w-[390px] mx-auto">
        <Button variant="primary" size="lg" className="w-full py-3 rounded-xl text-base font-medium">
          単語を登録
        </Button>
      </div>
    </div>;
};
export default Words;