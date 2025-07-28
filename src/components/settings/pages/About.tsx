import React from 'react';
const About: React.FC = () => {
  return <div className="p-4">
      <h2 className="text-xs font-medium text-gray-500 mb-2">
        RECO AI について
      </h2>
      <p className="text-sm text-gray-600">バージョン: 0.01</p>
      <p className="text-sm text-gray-600 mt-2">
        このアプリについての詳細情報やライセンス情報などがここに表示されます。
      </p>
    </div>;
};
export default About;