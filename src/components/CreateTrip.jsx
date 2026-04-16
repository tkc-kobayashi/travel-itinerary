import { useState } from 'react'

const EMPTY_FORM = { title: '', destination: '', startDate: '', endDate: '' }

export default function CreateTrip({ onBack }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'タイトルを入力してください'
    if (!form.destination.trim()) errs.destination = '行き先を入力してください'
    if (!form.startDate) errs.startDate = '出発日を入力してください'
    if (!form.endDate) errs.endDate = '帰着日を入力してください'
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      errs.endDate = '帰着日は出発日以降にしてください'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const newTrip = {
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('trips') || '[]')
    localStorage.setItem('trips', JSON.stringify([...existing, newTrip]))
    onBack()
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-10">
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-orange-400 to-amber-500 -mx-4 px-6 pt-10 pb-8 mb-6 shadow-md">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors"
        >
          ← 一覧に戻る
        </button>
        <h1 className="text-white text-2xl font-bold">旅行を追加する</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* タイトル */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1.5">
            旅行タイトル <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="例：夏の沖縄家族旅行"
            className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-300 outline-none transition-all
              focus:ring-2 focus:ring-orange-300 focus:border-orange-400
              ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* 行き先 */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1.5">
            行き先 <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="例：沖縄県"
            className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-300 outline-none transition-all
              focus:ring-2 focus:ring-orange-300 focus:border-orange-400
              ${errors.destination ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
        </div>

        {/* 日程 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1.5">
              出発日 <span className="text-orange-400">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-gray-800 outline-none transition-all
                focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                ${errors.startDate ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1.5">
              帰着日 <span className="text-orange-400">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              min={form.startDate || undefined}
              className={`w-full rounded-xl border px-4 py-3 text-gray-800 outline-none transition-all
                focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                ${errors.endDate ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
            />
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
          </div>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-md transition-colors mt-2"
        >
          旅行を保存する
        </button>
      </form>
    </div>
  )
}
