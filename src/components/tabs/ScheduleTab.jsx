/**
 * ScheduleTab コンポーネント（スケジュールタブ）
 *
 * 時間・場所・メモを持つスケジュール項目を追加・削除できる。
 * 項目は時間順に並び替えて表示する。
 *
 * Props:
 *   items    - スケジュール項目の配列 [{ id, time, place, memo }]
 *   onChange - 配列が変わったときに親（TripDetail）へ伝える関数
 */
import { useState } from 'react'

// 新規追加フォームの初期値
const EMPTY = { time: '', place: '', memo: '' }

// 入力欄の共通スタイル
const INPUT = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition-all'

export default function ScheduleTab({ items, onChange }) {
  /**
   * [useState が必要な理由：追加フォームの入力値管理]
   * ユーザーが入力するたびに画面を更新するため。
   * 追加ボタンを押したらリセットするため useState で管理する。
   */
  const [newItem, setNewItem] = useState(EMPTY)

  /** フォームの入力値を更新するハンドラ */
  function handleChange(e) {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  /** 「追加」ボタンを押したときのハンドラ */
  function handleAdd() {
    // 場所は必須（空欄ではじく）
    if (!newItem.place.trim()) return

    const item = {
      id:    crypto.randomUUID(),
      time:  newItem.time,
      place: newItem.place.trim(),
      memo:  newItem.memo.trim(),
    }

    // 追加後、時間順にソートして親へ伝える
    const sorted = [...items, item].sort((a, b) => a.time.localeCompare(b.time))
    onChange(sorted)

    // フォームをリセット
    setNewItem(EMPTY)
  }

  /** 「削除」ボタンを押したときのハンドラ */
  function handleDelete(id) {
    onChange(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">

      {/* 追加フォーム */}
      <div className="bg-sky-50 rounded-2xl border border-sky-100 p-4 space-y-2">
        <p className="text-sky-600 text-xs font-bold mb-3">✏️ スケジュールを追加</p>

        <div className="grid grid-cols-2 gap-2">
          {/* 時間入力 */}
          <div>
            <label className="text-gray-500 text-xs mb-1 block">時間</label>
            <input
              type="time"
              name="time"
              value={newItem.time}
              onChange={handleChange}
              className={INPUT}
            />
          </div>
          {/* 場所入力（必須） */}
          <div>
            <label className="text-gray-500 text-xs mb-1 block">場所 *</label>
            <input
              type="text"
              name="place"
              value={newItem.place}
              onChange={handleChange}
              placeholder="例：首里城"
              className={INPUT}
            />
          </div>
        </div>

        {/* メモ入力（任意） */}
        <div>
          <label className="text-gray-500 text-xs mb-1 block">メモ（任意）</label>
          <input
            type="text"
            name="memo"
            value={newItem.memo}
            onChange={handleChange}
            placeholder="例：入場券を事前購入"
            className={INPUT}
          />
        </div>

        {/* 追加ボタン */}
        <button
          onClick={handleAdd}
          className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm mt-1"
        >
          ＋ 追加する
        </button>
      </div>

      {/* スケジュール一覧 */}
      {items.length === 0 ? (
        // 空状態
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-2">📅</p>
          <p className="text-sm">スケジュールを追加しましょう</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-sky-100 p-4 shadow-sm flex gap-3 items-start"
            >
              {/* 時間バッジ */}
              <div className="shrink-0 bg-sky-100 text-sky-600 text-xs font-bold px-2 py-1 rounded-lg min-w-[52px] text-center">
                {item.time || '--:--'}
              </div>

              {/* 場所・メモ */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-semibold text-sm">{item.place}</p>
                {item.memo && (
                  <p className="text-gray-400 text-xs mt-0.5 truncate">{item.memo}</p>
                )}
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => handleDelete(item.id)}
                className="shrink-0 text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                aria-label="削除"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
