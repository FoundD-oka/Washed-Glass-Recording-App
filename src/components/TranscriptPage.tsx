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
  // メインタブの管理 (文字起こし vs 要約)
  const [mainTabIndex, setMainTabIndex] = useState(0); // 0: 要約, 1: 文字起こし
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

  const handleMainTabChange = (tabIndex: number) => {
    setMainTabIndex(tabIndex);
    // 文字起こしタブに切り替える時は編集モードを終了
    if (tabIndex === 1 && isEditing) {
      setIsEditing(false);
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
        <div className="flex flex-col h-full">
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

          {/* タブ */}
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            <div className="flex min-w-max">
              {/* 要約タブ */}
              {summaryTabs.map((tab, index) => (
                <button 
                  key={tab.id} 
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${mainTabIndex === 0 && activeTabIndex === index ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => {
                    setMainTabIndex(0);
                    setActiveTabIndex(index);
                  }}
                >
                  {tab.type}
                </button>
              ))}
              {/* 文字起こしタブ */}
              <button 
                className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${mainTabIndex === 1 ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleMainTabChange(1)}
              >
                文字起こし
              </button>
            </div>
          </div>

          {/* コンテンツ - 下部に余白を追加 */}
          <div className="flex-1 overflow-y-auto p-4 pb-28">
            {mainTabIndex === 0 ? (
              // 要約コンテンツ
              isEditing ? (
                <textarea 
                  className="w-full h-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm" 
                  value={activeTabIndex < summaryTabs.length ? summaryTabs[activeTabIndex].content : ''} 
                  onChange={handleTabContentChange} 
                />
              ) : (
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {activeTabIndex < summaryTabs.length ? summaryTabs[activeTabIndex].content : ''}
                </div>
              )
            ) : (
              // 文字起こしコンテンツ
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {transcriptText}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* フッター - 固定位置 - 要約タブでのみ表示 */}
      {mainTabIndex === 0 && (
        <div className="fixed bottom-[90px] left-0 right-0 max-w-[390px] mx-auto z-10">
          <div className="p-4 border-t border-gray-200 flex gap-3">
            <Button variant="outline" size="md" className="flex-1 flex items-center justify-center gap-2" onClick={handleEditToggle}>
              {isEditing ? <>
                  <SaveIcon className="h-4 w-4" />
                  保存
                </> : <>
                  <EditIcon className="h-4 w-4" />
                  編集
                </>}
            </Button>
            <Button className="flex-1 flex items-center justify-center gap-2 !bg-blue-500 text-white !hover:bg-blue-600" size="md" onClick={handleCreateNewSummary}>
              <PlusIcon className="h-4 w-4" />
              新しい要約を作る
            </Button>
          </div>
        </div>
      )}

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
      return `田中：えー、それでは始めさせていただきます。今日はお忙しい中お時間いただいてありがとうございます。
佐藤：よろしくお願いします。
田中：前四半期の結果なんですけども、えー、95%の達成ということで、まあまあ良い数字だったんですが、今四半期どうしましょうかね。
佐藤：そうですね、前回がたまたま良かったのかもしれないので、もう少し現実的な...
鈴木：いやいや、でも逆にもっと攻めていくべきじゃないですか？新しい施策もありますし。
高橋：そうですね、新製品の件もありますから。
田中：新製品の話が出ましたけど、鈴木さん、進捗いかがですか？
鈴木：はい、えー、7月のリリースに向けて順調に進んでまして、今テスト段階に入ってます。
佐藤：マーケティングの資料とかはいつごろ...？
鈴木：あー、来週末には第一稿をお見せできると思います。
高橋：販売チームのトレーニングも考えないと。
田中：そうですね。それと採用の件なんですが、佐藤さん、どうでしょう？
佐藤：3名と最終面接までいってまして、来週中には決定できそうです。
高橋：早めに決めて、新製品の前にトレーニング終わらせたいですね。
田中：分かりました。じゃあ次回は...29日の2時半からということで。
佐藤：会議室Aでよろしいですか？
田中：はい、よろしくお願いします。`;
    case '商談':
      return `佐藤：本日はお忙しい中、お時間いただきましてありがとうございます。
山田：こちらこそ、ありがとうございます。
佐藤：前回お話しさせていただいた件で、ご質問があるということでしたが...
山田：はい、えっと、導入コストの件なんですけども、もう少し詳しく教えていただけますか？
佐藤：はい、承知いたしました。初期導入が500万円で、年間の保守が100万円という形になります。
井上：あの、カスタマイズとかで金額って変わったりします？
鈴木：基本的な機能の範囲内でしたら初期費用に含まれてまして、特殊なご要望ですと別途という形になりますね。
山田：他社さんと比べて、どういったところが強みになりますか？
佐藤：そうですね、24時間365日のサポートと、導入後も定期的にコンサルティングさせていただくところですかね。
井上：導入ってどれくらいかかるもんなんですか？
鈴木：通常ですと2ヶ月程度なんですが、御社の場合既存システムとの連携もございますので、3ヶ月ぐらいを想定しております。
山田：分かりました。詳細な見積もりをいただけますか？
佐藤：はい、今週中にお送りいたします。
井上：技術的な資料もお願いします。
鈴木：承知いたしました。井上様宛てにお送りします。
山田：それと、来週役員に向けてプレゼンしていただけますか？
佐藤：はい、日程調整させていただきます。22日の1時からはいかがでしょうか？
山田：問題ございません。会議室でお待ちしております。`;
    case '1on1':
      return `田中：お疲れ様です。今日もよろしくお願いします。
佐藤：よろしくお願いします。
田中：先月のプロジェクトはどうでしたか？
佐藤：はい、無事予定通り完了できました。お客さんからも結構良い評価をいただけて。
田中：それは良かったですね。何か工夫されたことありました？
佐藤：そうですね、チーム内のコミュニケーションを意識して、週2回ぐらい進捗の確認をするようにしました。
田中：なるほど、それは良いアプローチですね。他のプロジェクトでも使えそうですし。
佐藤：ありがとうございます。ただ、最近複数のプロジェクトを抱えてて、スケジュール管理が結構大変で...
田中：あー、そうですか。具体的にはどんなところが？
佐藤：締切が重なっちゃった時に、どれを優先すべきか判断に迷うことがあって。
田中：確かにそれは難しいですね。優先順位をつけるためのフレームワークを一緒に考えてみましょうか。リソースの調整も必要に応じて検討しますし。
佐藤：ありがとうございます。それと、将来のことなんですが、プロジェクトマネージャーのスキルを身につけたいと思ってまして。
田中：いいですね。次のプロジェクトでサブリーダーをやってもらうのはどうでしょう？来月PM研修もあるので参加してみませんか？
佐藤：はい、ぜひお願いします。
田中：じゃあ優先順位の件は佐藤さんに案を作ってもらって、研修の申込みは私がサポートします。次回は24日の3時からで大丈夫ですか？
佐藤：はい、よろしくお願いします。`;
    default:
      return `佐藤：お疲れ様です。それでは始めさせていただきます。
田中：よろしくお願いします。
佐藤：まず進捗の報告なんですが、フェーズ1は無事予定通り完了しました。
田中：お疲れ様でした。何か課題とかありました？
佐藤：リソースの配分でちょっと苦労しましたけど、チーム全体で調整して何とか。
鈴木：フェーズ2は来週から開始ということで大丈夫ですかね？
田中：はい、予定通りで。
山田：先週お客さんとミーティングしたんですが、フィードバックをいくつかいただいてまして。
田中：どんな内容でした？
山田：UIの使いやすさの件と、あと追加機能の要望もありました。
佐藤：それって優先順位つけて開発計画に入れないといけませんね。
鈴木：修正を踏まえたスケジュール案を作ってみたんですが...
佐藤：納期に影響しますか？
鈴木：今のところは大丈夫だと思うんですが、余裕はなくなりましたね。
田中：リスク対策も考えておいた方が良さそうですね。
佐藤：分かりました。フェーズ2は来週月曜から、フィードバックの優先順位は今週中に、あと予備リソースも確保ということで。
田中：次回は22日の1時からで良いですか？
鈴木：会議室Bで大丈夫です。
佐藤：よろしくお願いします。`;
  }
}
// ダミーの要約テキストを生成
function getDummySummary(tag?: string): string {
  switch (tag) {
    case '会議':
      return `【要約：第2四半期戦略会議】
■ 決定事項
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