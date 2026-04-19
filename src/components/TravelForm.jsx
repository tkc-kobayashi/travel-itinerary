/**
 * TravelForm コンポーネント
 *
 * 旅行作成フォーム。保存先が localStorage から Firestore に変わった。
 * addTrip が非同期になったため、await で完了を待ってから画面遷移する。
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTrip } from '../utils/storage'

const EMPTY_FORM = { title: '', destination: '', startDate: '', endDate: '' }

const INPUT_BASE =
  'w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-300 outline-none transition-all focus:ring-2 focus:ring-sky-300 focus:border-sky-400'

export default function TravelForm() {
  const navigate = useNavigate()

  const [form,   setForm]   = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  /**
   * [useState が必要な理由：保存中フラグ]
   * Firestore への保存は非同期のため、完了するまでボタンを無効化して
   * 二重送信を防ぐ。保存中は「保存中...」と表示する。
   */
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.title.trim())       errs.title       = 'タイトルを入力してください'
    if (!form.destination.trim()) errs.destination = '行き先を入力してください'
    if (!form.startDate)          errs.startDate   = '出発日を入力してください'
    if (!form.endDate)            errs.endDate     = '帰着日を入力してください'
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      errs.endDate = '帰着日は出発日以降にしてください'
    }
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const newTrip = {
      id: crypto.randomUUID(),
      ...form,
      schedule:    [],
      spots:       [],
      restaurants: [],
      createdAt:   new Date().toISOString(),
    }

    setSaving(true)
    try {
      // Firestore への保存が完了するまで await で待つ
      await addTrip(newTrip)
      navigate(`/trip/${newTrip.id}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1.5">
          旅行タイトル <span className="text-sky-400">*</span>
        </label>
        <input type="text" name="title" value={form.title} onChange={handleChange}
          placeholder="例：夏の沖縄家族旅行"
          className={`${INPUT_BASE} ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1.5">
          行き先 <span className="text-sky-400">*</span>
        </label>
        <input type="text" name="destination" value={form.destination} onChange={handleChange}
          placeholder="例：沖縄県"
          className={`${INPUT_BASE} ${errors.destination ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
        />
        {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1.5">
            出発日 <span className="text-sky-400">*</span>
          </label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange}
            className={`${INPUT_BASE} ${errors.startDate ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1.5">
            帰着日 <span className="text-sky-400">*</span>
          </label>
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange}
            min={form.startDate || undefined}
            className={`${INPUT_BASE} ${errors.endDate ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 disabled:bg-sky-200 text-white font-bold py-4 rounded-2xl shadow-md transition-colors mt-2"
      >
        {saving ? '保存中...' : '旅行を作成する →'}
      </button>
    </form>
  )
}
