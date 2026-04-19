/**
 * TripList コンポーネント（旅行一覧画面 / トップ画面）
 *
 * Firestore から旅行データをリアルタイムで取得して一覧表示する。
 * 誰かが旅行を追加・変更すると、このページも自動的に更新される。
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { subscribeTrips } from '../utils/storage'
import Header from './Header'
import TravelCard from './TravelCard'
import Loading from './Loading'

export default function TripList() {
  const navigate = useNavigate()

  /**
   * [useState が必要な理由：旅行リストと読み込み状態の管理]
   *
   * trips   → Firestore からデータが届くたびに更新され、カードを再描画する
   * loading → データ取得中はスピナーを表示し、届いたら非表示にする
   */
  const [trips,   setTrips]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /**
     * subscribeTrips はリアルタイム購読を開始する。
     * Firestore のデータが変わるたびに setTrips が呼ばれ、画面が自動更新される。
     * useEffect の返り値に unsubscribe を渡すと、
     * ページを離れたときに自動でリスナーが解除される。
     */
    const unsubscribe = subscribeTrips((data) => {
      setTrips(data)
      setLoading(false)
    })
    return unsubscribe // コンポーネントが消えたら購読を解除
  }, []) // [] = マウント時に一度だけ実行

  return (
    <div className="max-w-lg mx-auto px-4 pb-10">
      <Header
        eyebrow="TRAVEL ITINERARY"
        title="家族のしおり"
        subtitle="思い出の旅をまとめよう"
      />

      {/* データ取得中はスピナーを表示 */}
      {loading ? (
        <Loading />
      ) : trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">✈️</div>
          <p className="text-gray-500 text-lg font-medium">旅行がまだありません</p>
          <p className="text-gray-400 text-sm mt-1">下のボタンから旅行を追加しましょう</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <TravelCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}

      {/* 右下の固定「＋」ボタン */}
      <button
        onClick={() => navigate('/create')}
        className="fixed bottom-6 right-6 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-bold text-lg w-14 h-14 rounded-full shadow-lg transition-colors flex items-center justify-center"
        aria-label="旅行を追加"
      >
        ＋
      </button>
    </div>
  )
}
