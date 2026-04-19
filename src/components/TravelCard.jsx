/**
 * TravelCard コンポーネント
 *
 * 旅行一覧の1件分のカードを表示する。
 * カード全体をクリックすると旅行詳細画面に遷移する。
 *
 * Props:
 *   trip - 旅行データ（id / title / destination / startDate / endDate）
 */
import { useNavigate } from 'react-router-dom'

// ---- ヘルパー関数 ----

/** 日付を「2026年8月1日」形式にフォーマットして「出発日 〜 帰着日」を返す */
function formatDateRange(startDate, endDate) {
  const fmt = (d) =>
    new Date(d).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  return `${fmt(startDate)} 〜 ${fmt(endDate)}`
}

/** 出発日と帰着日の差から「◯泊◯日」または「日帰り」を返す */
function calcNights(startDate, endDate) {
  const diff = new Date(endDate) - new Date(startDate)
  const nights = Math.round(diff / (1000 * 60 * 60 * 24))
  if (nights <= 0) return '日帰り'
  return `${nights}泊${nights + 1}日`
}

// ---- コンポーネント本体 ----

export default function TravelCard({ trip }) {
  const navigate = useNavigate()

  return (
    <div
      // クリックで旅行詳細ページへ遷移（URL: /trip/:id）
      onClick={() => navigate(`/trip/${trip.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-sky-100 p-5 hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">

        {/* 左側：旅行名・行き先・日程 */}
        <div className="flex-1 min-w-0">
          <h2 className="text-gray-800 font-bold text-lg leading-tight truncate">
            {trip.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-sky-400 text-sm">📍</span>
            <span className="text-gray-600 text-sm font-medium">{trip.destination}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sky-400 text-sm">📅</span>
            <span className="text-gray-500 text-sm">
              {formatDateRange(trip.startDate, trip.endDate)}
            </span>
          </div>
        </div>

        {/* 右側：◯泊◯日バッジ */}
        <span className="shrink-0 bg-sky-50 text-sky-500 text-xs font-bold px-3 py-1 rounded-full border border-sky-200">
          {calcNights(trip.startDate, trip.endDate)}
        </span>
      </div>
    </div>
  )
}
