/**
 * Loading コンポーネント
 *
 * Firebase からデータを取得中に表示するスピナー。
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-400 rounded-full animate-spin mb-3" />
      <p className="text-gray-400 text-sm">読み込み中...</p>
    </div>
  )
}
