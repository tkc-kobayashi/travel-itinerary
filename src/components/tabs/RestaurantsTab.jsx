/**
 * RestaurantsTab コンポーネント（レストランタブ）
 *
 * 店名・メモを持つレストランを追加・削除できる。
 *
 * Props:
 *   items    - レストラン項目の配列 [{ id, name, memo }]
 *   onChange - 配列が変わったときに親（TripDetail）へ伝える関数
 */
import { useState } from 'react'

const EMPTY = { name: '', memo: '' }
const INPUT = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition-all'

export default function RestaurantsTab({ items, onChange }) {
  /**
   * [useState が必要な理由：追加フォームの入力値管理]
   * 入力のたびに画面を更新し、追加後にリセットするため。
   */
  const [newItem, setNewItem] = useState(EMPTY)

  function handleChange(e) {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  function handleAdd() {
    if (!newItem.name.trim()) return

    const item = {
      id:   crypto.randomUUID(),
      name: newItem.name.trim(),
      memo: newItem.memo.trim(),
    }
    onChange([...items, item])
    setNewItem(EMPTY)
  }

  function handleDelete(id) {
    onChange(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">

      {/* 追加フォーム */}
      <div className="bg-sky-50 rounded-2xl border border-sky-100 p-4 space-y-2">
        <p className="text-sky-600 text-xs font-bold mb-3">✏️ レストランを追加</p>

        <div>
          <label className="text-gray-500 text-xs mb-1 block">店名 *</label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="例：海人食堂"
            className={INPUT}
          />
        </div>

        <div>
          <label className="text-gray-500 text-xs mb-1 block">メモ（任意）</label>
          <input
            type="text"
            name="memo"
            value={newItem.memo}
            onChange={handleChange}
            placeholder="例：要予約、ソーキそばが絶品"
            className={INPUT}
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm mt-1"
        >
          ＋ 追加する
        </button>
      </div>

      {/* レストラン一覧 */}
      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-2">🍽</p>
          <p className="text-sm">レストランを追加しましょう</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-sky-100 p-4 shadow-sm flex gap-3 items-start"
            >
              {/* レストランアイコン */}
              <span className="shrink-0 text-xl">🍽</span>

              {/* 店名・メモ */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-semibold text-sm">{item.name}</p>
                {item.memo && (
                  <p className="text-gray-400 text-xs mt-0.5">{item.memo}</p>
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
