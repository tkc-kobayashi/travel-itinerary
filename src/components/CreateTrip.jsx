/**
 * CreateTrip コンポーネント（旅行作成画面）
 *
 * ヘッダーとフォームを組み合わせた旅行作成ページ。
 * フォームのロジックは TravelForm が担当するため、
 * このコンポーネントはレイアウトの組み立てだけを行う。
 */
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import TravelForm from './TravelForm'

export default function CreateTrip() {
  const navigate = useNavigate()

  return (
    <div className="max-w-lg mx-auto px-4 pb-10">

      {/* 共通ヘッダー：戻るボタンあり */}
      <Header
        title="旅行を追加する"
        onBack={() => navigate('/')}
      />

      {/* フォーム（保存後は TravelForm 内で詳細画面へ自動遷移） */}
      <TravelForm />
    </div>
  )
}
