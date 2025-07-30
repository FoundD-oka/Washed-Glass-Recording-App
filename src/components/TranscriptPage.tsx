import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, EditIcon, SaveIcon, PlusIcon } from 'lucide-react';
import Button from './ui/Button';
import { useToast } from './ui/ToastProvider';
import BottomNav from './BottomNav';
interface TranscriptPageProps {
  recording: {
    id: string;
    url: string;
    name: string;
    duration: string;
    date: string;
    tag?: string;
  } | null;
  onBack: () => void;
}
interface SummaryTab {
  id: string;
  type: string;
  content: string;
}
const TranscriptPage: React.FC<TranscriptPageProps> = ({
  recording,
  onBack
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [transcriptText, setTranscriptText] = useState(getDummyTranscript(recording?.tag));
  // 要約タブを動的に管理
  const [summaryTabs, setSummaryTabs] = useState<SummaryTab[]>([]);
  const {
    showToast,
    showCustomToast
  } = useToast();
  // 初期化時に録音のタグに基づいて最初のタブを設定
  useEffect(() => {
    if (recording?.tag) {
      setSummaryTabs([{
        id: recording.tag,
        type: recording.tag,
        content: getDummySummary(recording.tag)
      }]);
    } else {
      setSummaryTabs([{
        id: 'default',
        type: '要約',
        content: getDummySummary()
      }]);
    }
  }, [recording]);
  const handleEditToggle = () => {
    if (isEditing) {
      // 保存処理
      if (activeTabIndex < summaryTabs.length) {
        const updatedTabs = [...summaryTabs];
        updatedTabs[activeTabIndex] = {
          ...updatedTabs[activeTabIndex],
          content: summaryTabs[activeTabIndex].content
        };
        setSummaryTabs(updatedTabs);
      }
      setIsEditing(false);
      showToast('変更を保存しました', 'success');
    } else {
      setIsEditing(true);
    }
  };
  const handleCreateNewSummary = () => {
    const summaryTypes = [{
      id: '会議',
      name: '会議'
    }, {
      id: '商談',
      name: '商談'
    }, {
      id: '1on1',
      name: '1on1'
    }, {
      id: 'ミーティング',
      name: 'ミーティング'
    }, {
      id: '初回商談',
      name: '初回商談'
    }, {
      id: 'プレゼン',
      name: 'プレゼン'
    }].filter(type => !summaryTabs.some(tab => tab.type === type.id)); // 既存のタブは除外
    if (summaryTypes.length === 0) {
      showToast('すべての要約の型が作成済みです', 'info');
      return;
    }
    showCustomToast('要約の型を選択', 'info', summaryTypes, selectedType => {
      showToast(`${selectedType}の形式で要約を作成しています...`, 'info');
      // 3秒後に新しい要約を表示（実際のアプリではAI処理）
      setTimeout(() => {
        // 新しいタブを追加
        const newTab = {
          id: `${selectedType}-${Date.now()}`,
          type: selectedType,
          content: getDummySummary(selectedType)
        };
        setSummaryTabs(prev => [...prev, newTab]);
        setActiveTabIndex(summaryTabs.length); // 新しく追加したタブにフォーカス
        showToast('新しい要約が作成されました', 'success');
      }, 3000);
    });
  };
  const handleTabContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeTabIndex < summaryTabs.length) {
      const updatedTabs = [...summaryTabs];
      updatedTabs[activeTabIndex] = {
        ...updatedTabs[activeTabIndex],
        content: e.target.value
      };
      setSummaryTabs(updatedTabs);
    }
  };
  if (!recording) {
    return <div className="w-full mx-auto flex flex-col h-screen max-w-[390px] items-center justify-center">
        <div className="text-gray-500">録音が見つかりません</div>
        <Button variant="outline" size="md" className="mt-4" onClick={onBack}>
          戻る
        </Button>
      </div>;
  }
  return <div className="w-full mx-auto flex flex-col h-screen max-w-[390px] relative">
      <div className="backdrop-blur-2xl bg-white/60 rounded-2xl shadow-xl overflow-hidden border border-white/50 flex-1 flex flex-col">
        <div className="flex flex-col h-full pb-[120px]">
          {/* ヘッダー */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100" onClick={onBack}>
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-800 flex-1 truncate">
                {recording.name}
              </h1>
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <span>{recording.duration}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{recording.date}</span>
              {recording.tag && <>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {recording.tag}
                  </span>
                </>}
            </div>
          </div>

          {/* タブ - 要約の型に基づいて動的に表示 */}
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            <div className="flex min-w-max">
              {summaryTabs.map((tab, index) => <button key={tab.id} className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTabIndex === index ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTabIndex(index)}>
                  {tab.type}
                </button>)}
            </div>
          </div>

          {/* コンテンツ */}
          <div className="flex-1 overflow-y-auto p-4">
            {isEditing ? <textarea className="w-full h-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm" value={activeTabIndex < summaryTabs.length ? summaryTabs[activeTabIndex].content : ''} onChange={handleTabContentChange} /> : <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {activeTabIndex < summaryTabs.length ? summaryTabs[activeTabIndex].content : ''}
              </div>}
          </div>

          {/* フッター */}
          <div className="p-4 border-t border-gray-200 flex gap-3 bg-white/80 backdrop-blur-sm fixed bottom-[90px] left-0 right-0 max-w-[390px] mx-auto z-10">
            <Button variant="outline" size="md" className="flex-1 flex items-center justify-center gap-2" onClick={handleEditToggle}>
              {isEditing ? <>
                  <SaveIcon className="h-4 w-4" />
                  保存
                </> : <>
                  <EditIcon className="h-4 w-4" />
                  編集
                </>}
            </Button>
            <Button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600" size="md" onClick={handleCreateNewSummary} disabled={isEditing}>
              <PlusIcon className="h-4 w-4" />
              新しい要約を作る
            </Button>
          </div>
        </div>
      </div>

      {/* BottomNav - 最下部に固定 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-20">
        <BottomNav active="home" />
      </div>
    </div>;
};
// ダミーの議事録テキストを生成
function getDummyTranscript(tag?: string): string {
  switch (tag) {
    case '会議':
      return `日時：2023年5月15日 14:30～16:00
参加者：田中、佐藤、鈴木、高橋
【議題1：第2四半期の売上目標について】
田中：前四半期の結果を踏まえて、今四半期の目標設定をしたいと思います。
佐藤：前四半期は目標の95%達成でした。今回はより現実的な数字にすべきでしょうか。
鈴木：いいえ、むしろ高い目標を設定して、新しい施策を打ち出すべきだと思います。
高橋：同意します。特に新製品のローンチがあるので、それに合わせた数字を考えましょう。
【議題2：新製品の進捗状況】
田中：開発チームから最新情報をお願いします。
鈴木：予定通り7月の発売に向けて進んでいます。テスト段階に入りました。
佐藤：マーケティング資料はいつ頃共有されますか？
鈴木：来週末には第一稿をお見せできると思います。
高橋：販売チームへのトレーニングも計画しないといけませんね。
【議題3：人事採用について】
田中：営業部門の増員について議論したいと思います。
佐藤：現在3名の候補者と最終面接まで進んでいます。来週中に決定できそうです。
高橋：早めに決定して、新製品ローンチ前にトレーニングを完了させたいですね。
【次回会議】
日時：2023年5月29日 14:30～16:00
場所：会議室A`;
    case '商談':
      return `日時：2023年5月12日 10:15～11:30
顧客：ABC株式会社
担当者：山田様（購買部長）、井上様（IT部門）
当社：佐藤（営業）、鈴木（技術）
【商談内容】
佐藤：本日は貴重なお時間をいただきありがとうございます。前回のご提案に対するご質問があるとのことでしたが。
山田：はい、導入コストと運用コストについてもう少し詳しく知りたいです。
佐藤：承知しました。初期導入費用は500万円、年間の保守費用は100万円となります。
井上：カスタマイズの範囲によって費用は変わりますか？
鈴木：基本機能内のカスタマイズは初期費用に含まれています。特殊な機能追加は別途お見積りとなります。
山田：競合他社と比較して、御社の強みは何ですか？
佐藤：24時間365日のサポート体制と、導入後の定期的なコンサルティングが含まれている点です。
井上：導入期間はどれくらいを想定していますか？
鈴木：標準的なケースで約2ヶ月です。御社の場合、既存システムとの連携も考慮して3ヶ月程度を見ています。
【決定事項】
・詳細な見積書を今週中に送付
・技術的な詳細資料を井上様宛てに送付
・来週、役員向けプレゼンの日程調整
【次回アポイント】
日時：2023年5月22日 13:00～
場所：ABC株式会社 会議室`;
    case '1on1':
      return `日時：2023年5月10日 15:00～15:45
上司：田中
メンバー：佐藤
【最近の業務状況】
佐藤：先月担当した新規プロジェクトは予定通り完了しました。顧客からも良い評価をいただいています。
田中：素晴らしいですね。特に工夫した点はありますか？
佐藤：チーム内のコミュニケーションを密にして、週2回の進捗確認ミーティングを設けました。それが効果的でした。
田中：その取り組みは他のプロジェクトにも活かせそうですね。
【課題・悩み】
佐藤：現在担当している複数のプロジェクトのスケジュール管理が難しいと感じています。
田中：具体的にはどんな点が難しいですか？
佐藤：締切が近いプロジェクトが複数重なると、優先順位の判断に迷うことがあります。
田中：なるほど。プロジェクト間の優先順位付けのフレームワークを一緒に考えましょう。また、必要に応じてリソースの再配分も検討します。
【キャリア開発】
田中：今後のキャリアについてどのように考えていますか？
佐藤：将来的にはプロジェクトマネージャーとしてのスキルを磨きたいと考えています。
田中：それは良いですね。次のプロジェクトではサブリーダーとして参加してもらうことを検討しましょう。また、社内のPM研修も来月開催されますので参加をお勧めします。
【アクションアイテム】
1. 佐藤：プロジェクト優先順位付けの案を作成
2. 田中：PM研修の申込み手続きをサポート
3. 田中：次期プロジェクトでのサブリーダー役割について検討
【次回1on1】
日時：2023年5月24日 15:00～`;
    default:
      return `日時：2023年5月15日 13:00～14:30
参加者：佐藤、田中、鈴木、山田
【議題1：プロジェクトの進捗状況】
佐藤：現在の進捗状況について報告します。フェーズ1は予定通り完了しました。
田中：素晴らしいです。何か課題はありましたか？
佐藤：リソース配分に少し苦労しましたが、チーム全体で調整して乗り越えました。
鈴木：フェーズ2はスケジュール通り来週から開始予定です。
【議題2：顧客からのフィードバック】
山田：先週の顧客ミーティングでいくつかフィードバックをいただきました。
田中：どのような内容でしたか？
山田：主にUIの使いやすさについてと、追加機能のリクエストがありました。
佐藤：それらの対応優先度を決めて、開発計画に組み込む必要がありますね。
【議題3：今後のスケジュール】
鈴木：修正点を踏まえた新しいスケジュール案を作成しました。
佐藤：納期への影響はありますか？
鈴木：現時点では納期は守れる見込みですが、余裕は少なくなっています。
田中：リスク対策も考えておく必要がありますね。
【決定事項】
1. フェーズ2は予定通り来週月曜日から開始
2. 顧客フィードバックの優先順位付けを今週中に完了
3. リスク対策として予備リソースを確保
【次回ミーティング】
日時：2023年5月22日 13:00～
場所：会議室B`;
  }
}
// ダミーの要約テキストを生成
function getDummySummary(tag?: string): string {
  switch (tag) {
    case '会議':
      return `【要約：第2四半期戦略会議】
■ 主要決定事項
・第2四半期の売上目標：前四半期比10%増
・新製品ローンチ：7月予定（開発は予定通り進行中）
・営業部門の増員：3名を来週中に最終決定予定
■ 次のアクション
1. 新製品マーケティング資料：来週末までに第一稿共有
2. 販売チームへのトレーニング計画策定
3. 採用決定と新人トレーニングスケジュール作成
■ 次回会議
日時：2023年5月29日 14:30～16:00
場所：会議室A`;
    case '商談':
      return `【商談要約：ABC株式会社】
■ 商談ポイント
・初期導入費用：500万円
・年間保守費用：100万円
・導入期間：約3ヶ月（既存システム連携含む）
・顧客関心事項：コスト詳細、カスタマイズ範囲、競合比較
■ 当社アピールポイント
・24時間365日サポート体制
・導入後の定期的なコンサルティング
■ 次のアクション
1. 詳細見積書送付（今週中）
2. 技術詳細資料送付（井上様宛）
3. 役員向けプレゼン日程調整
■ 次回アポイント
日時：2023年5月22日 13:00～
場所：ABC株式会社 会議室`;
    case '1on1':
      return `【1on1要約：佐藤】
■ 成果・進捗
・新規プロジェクト完了（顧客評価良好）
・週2回の進捗確認ミーティングが効果的
■ 課題
・複数プロジェクトのスケジュール・優先順位管理
■ キャリア希望
・将来的にプロジェクトマネージャーを目指す
■ 次のアクション
1. プロジェクト優先順位付けの案作成（佐藤）
2. PM研修申込み手続き（田中）
3. 次期プロジェクトでのサブリーダー役割検討（田中）
■ 次回1on1
日時：2023年5月24日 15:00～`;
    case 'ミーティング':
      return `【ミーティング要約】
■ 議題と進捗
・プロジェクトA：リリース計画の確認完了
・マーケティング施策：SNS広告の効果測定結果共有
・予算配分：第3四半期予算案承認
■ 課題点
・リソース不足：デザインチームの負荷が高い
・スケジュール遅延：API連携部分に技術的課題
■ 決定事項
1. デザインチームに一時的に外部リソースを追加
2. API連携の代替案を検討し、来週までに決定
3. 次回リリース日を1週間延期
■ 次回ミーティング
日時：2023年5月20日 10:00～
場所：オンライン`;
    case '初回商談':
      return `【初回商談要約：XYZ社】
■ 顧客情報
・業種：製造業（電子部品）
・規模：従業員約200名、年商30億円
・課題：生産管理システムの老朽化、データ連携の非効率
■ ニーズ
・リアルタイムデータ分析
・モバイル対応
・既存ERPとの連携
■ 提案内容
・クラウド型生産管理システム
・カスタムダッシュボード
・API連携サービス
■ 次のステップ
1. 詳細要件ヒアリング（来週火曜）
2. デモ環境の準備（2週間以内）
3. 概算見積りの作成
■ 決裁者
田中部長（IT部門）、佐藤工場長（最終決裁者）`;
    case 'プレゼン':
      return `【プレゼン要約：新製品発表会】
■ 発表内容
・新製品名：SmartConnect Pro
・主要機能：AIアシスタント、自動データ同期、マルチデバイス対応
・価格：月額9,800円（年間契約で20%オフ）
・リリース日：2023年7月1日
■ 競合優位性
・業界最速の処理速度
・カスタマイズ性の高さ
・24時間サポート体制
■ 質疑応答
Q: 既存ユーザーへの移行プランは？
A: 無償アップグレードと3ヶ月のサポート付き
Q: セキュリティ対策は？
A: SOC2認証取得済み、エンドツーエンド暗号化実装
■ 次のアクション
1. プレスリリース配信（6月1日）
2. 先行ユーザープログラム開始（6月15日）
3. パートナー向け研修実施（6月下旬）`;
    default:
      return `【プロジェクト進捗会議 要約】
■ 現状
・フェーズ1：予定通り完了
・フェーズ2：来週から開始予定
■ 課題
・顧客からUIの使いやすさに関するフィードバック
・追加機能リクエストへの対応
・スケジュールの余裕が少ない
■ 決定事項
1. フェーズ2は予定通り来週月曜開始
2. 顧客フィードバックの優先順位付けを今週中に完了
3. リスク対策として予備リソースを確保
■ 次回ミーティング
日時：2023年5月22日 13:00～
場所：会議室B`;
  }
}
export default TranscriptPage;