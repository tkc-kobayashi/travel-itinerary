/**
 * App コンポーネント
 *
 * React Router でアプリ全体のルーティングを管理する。
 * 画面遷移は URL ベースで行い、各ページをコンポーネントに対応させる。
 *
 *   /          → 旅行一覧（TripList）
 *   /create    → 旅行作成（CreateTrip）
 *   /trip/:id  → 旅行詳細（TripDetail）
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TripList from './components/TripList'
import CreateTrip from './components/CreateTrip'
import TripDetail from './components/TripDetail'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sky-50">
        <Routes>
          <Route path="/"          element={<TripList />} />
          <Route path="/create"    element={<CreateTrip />} />
          <Route path="/trip/:id"  element={<TripDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
