/**
 * Header コンポーネント（共通ヘッダー）
 *
 * TripList・CreateTrip・TripDetail の全画面で使う共通ヘッダー。
 * Props によって表示内容を柔軟に切り替えられる。
 *
 * Props:
 *   title      - メインタイトル（必須）
 *   eyebrow    - タイトル上の小さいラベル（任意）
 *   subtitle   - タイトル下の説明文（任意）
 *   onBack     - 戻るボタンを押したときの関数（任意・指定時のみボタンを表示）
 *   compact    - true にすると文字サイズを小さくする（任意・詳細画面で使用）
 */
export default function Header({ title, eyebrow, subtitle, onBack, compact = false }) {
  return (
    <div className="bg-linear-to-br from-sky-400 to-blue-500 -mx-4 px-6 pt-10 pb-8 mb-6 shadow-md">

      {/* onBack が渡されたときだけ「戻る」ボタンを表示 */}
      {onBack && (
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors"
        >
          ← 一覧に戻る
        </button>
      )}

      {/* eyebrow（小さいラベル）が渡されたときだけ表示 */}
      {eyebrow && (
        <p className="text-sky-100 text-sm font-medium tracking-wide mb-1">
          {eyebrow}
        </p>
      )}

      {/* compact prop でタイトルサイズを切り替える */}
      <h1 className={`text-white font-bold ${compact ? 'text-xl' : 'text-3xl'}`}>
        {title}
      </h1>

      {/* subtitle が渡されたときだけ表示 */}
      {subtitle && (
        <p className="text-sky-100 text-sm mt-1">{subtitle}</p>
      )}
    </div>
  )
}
