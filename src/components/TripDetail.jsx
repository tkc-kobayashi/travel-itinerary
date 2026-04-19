/**
 * TripDetail コンポーネント（旅行詳細画面）
 *
 * Firestore から旅行データをリアルタイムで取得する。
 * 誰かがスポットを追加すると、他の家族のスマホにも即座に反映される。
 */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { subscribeTripById, updateTripField } from '../utils/storage'
import Header from './Header'
import Loading from './Loading'
import ScheduleTab from './tabs/ScheduleTab'
import SpotsTab from './tabs/SpotsTab'
import RestaurantsTab from './tabs/RestaurantsTab'

const TABS = [
  { key: 'schedule',    label: '予定',    icon: '📅' },
  { key: 'spots',       label: 'スポット', icon: '📍' },
  { key: 'restaurants', label: 'グルメ',   icon: '🍽' },
]

export default function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('schedule')
  const [trip,    setTrip]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /**
     * Firestore のリアルタイム購読。
     * 誰かがデータを変更するたびに setTrip が呼ばれ、全員の画面が更新される。
     */
    const unsubscribe = subscribeTripById(id, (data) => {
      setTrip(data)
      setLoading(false)
    })
    return unsubscribe
  }, [id])

  if (loading) {
    return <div className="max-w-lg mx-auto px-4"><Loading /></div>
  }

  if (!trip) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-20 text-center">
        <p className="text-6xl mb-4">🗺</p>
        <p className="text-gray-500 text-lg font-medium mb-6">旅行が見つかりません</p>
        <button onClick={() => navigate('/')}
          className="bg-sky-400 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          一覧に戻る
        </button>
      </div>
    )
  }

  /**
   * タブのデータを更新する関数
   *
   * ① setTrip で画面を即座に更新（楽観的更新：ネットワーク完了を待たない）
   * ② updateTripField で Firestore に非同期で書き込む
   *    → Firestore が更新されると onSnapshot が発火し、
   *      他の家族のスマホでも自動的に画面が更新される
   */
  async function handleUpdate(field, items) {
    setTrip((prev) => ({ ...prev, [field]: items })) // 即時反映
    await updateTripField(id, field, items)           // Firestore に保存
  }

  const fmt = (d) =>
    new Date(d).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-lg mx-auto pb-10">
      <Header
        title={trip.title}
        subtitle={`${trip.destination}｜${fmt(trip.startDate)} 〜 ${fmt(trip.endDate)}`}
        onBack={() => navigate('/')}
        compact
      />

      <div className="px-4">
        {/* タブバー */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-sky-100 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 rounded-xl text-xs font-bold transition-colors
                ${activeTab === tab.key
                  ? 'bg-sky-400 text-white shadow-sm'
                  : 'text-gray-400 hover:text-sky-400'}`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'schedule' && (
          <ScheduleTab
            items={trip.schedule ?? []}
            onChange={(items) => handleUpdate('schedule', items)}
          />
        )}
        {activeTab === 'spots' && (
          <SpotsTab
            items={trip.spots ?? []}
            onChange={(items) => handleUpdate('spots', items)}
          />
        )}
        {activeTab === 'restaurants' && (
          <RestaurantsTab
            items={trip.restaurants ?? []}
            onChange={(items) => handleUpdate('restaurants', items)}
          />
        )}
      </div>
    </div>
  )
}
