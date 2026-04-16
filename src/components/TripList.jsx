import { useState } from 'react'

function formatDateRange(startDate, endDate) {
  const fmt = (d) =>
    new Date(d).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  return `${fmt(startDate)} 〜 ${fmt(endDate)}`
}

function calcNights(startDate, endDate) {
  const diff = new Date(endDate) - new Date(startDate)
  const nights = Math.round(diff / (1000 * 60 * 60 * 24))
  if (nights <= 0) return '日帰り'
  return `${nights}泊${nights + 1}日`
}

export default function TripList({ onCreateNew }) {
  const [trips] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('trips') || '[]')
    } catch {
      return []
    }
  })

  return (
    <div className="max-w-lg mx-auto px-4 pb-10">
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-orange-400 to-amber-500 -mx-4 px-6 pt-10 pb-8 mb-6 shadow-md">
        <p className="text-orange-100 text-sm font-medium tracking-wide mb-1">TRAVEL ITINERARY</p>
        <h1 className="text-white text-3xl font-bold">家族のしおり</h1>
        <p className="text-orange-100 text-sm mt-1">思い出の旅をまとめよう</p>
      </div>

      {/* 旅行一覧 */}
      {trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">✈️</div>
          <p className="text-gray-500 text-lg font-medium">旅行がまだありません</p>
          <p className="text-gray-400 text-sm mt-1">下のボタンから旅行を追加しましょう</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-gray-800 font-bold text-lg leading-tight truncate">
                    {trip.title}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-orange-400 text-sm">📍</span>
                    <span className="text-gray-600 text-sm font-medium">{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-orange-400 text-sm">📅</span>
                    <span className="text-gray-500 text-sm">
                      {formatDateRange(trip.startDate, trip.endDate)}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 bg-orange-50 text-orange-500 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                  {calcNights(trip.startDate, trip.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 新規作成ボタン */}
      <button
        onClick={onCreateNew}
        className="fixed bottom-6 right-6 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white font-bold text-lg w-14 h-14 rounded-full shadow-lg transition-colors flex items-center justify-center"
        aria-label="旅行を追加"
      >
        ＋
      </button>
    </div>
  )
}
