import React from 'react';
import Button from '../../ui/Button';
const SummaryTemplates: React.FC = () => {
  const templates = [{
    id: 1,
    name: '会議',
    description: '会議の要点と決定事項をまとめます'
  }, {
    id: 2,
    name: '商談',
    description: '商談内容と次のアクションをまとめます'
  }, {
    id: 3,
    name: '1on1',
    description: '1on1での話題と課題をまとめます'
  }, {
    id: 4,
    name: 'ミーティング',
    description: 'ミーティングの内容と参加者をまとめます'
  }, {
    id: 5,
    name: '初回商談',
    description: '初回商談での顧客ニーズと提案内容をまとめます'
  }, {
    id: 6,
    name: 'プレゼン',
    description: 'プレゼン内容と質疑応答をまとめます'
  }];
  return <div className="p-4">
      <h2 className="text-xs font-medium text-gray-500 mb-2">要約の型</h2>
      <div className="space-y-3 mb-6">
        {templates.map(template => <div key={template.id} className="p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
            <div className="font-medium text-sm text-gray-800">
              {template.name}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {template.description}
            </div>
          </div>)}
      </div>
      <div className="fixed bottom-8 left-0 right-0 px-4 max-w-[390px] mx-auto">
        <Button variant="primary" size="lg" className="w-full py-3 rounded-xl text-base font-medium">
          型の追加
        </Button>
      </div>
    </div>;
};
export default SummaryTemplates;