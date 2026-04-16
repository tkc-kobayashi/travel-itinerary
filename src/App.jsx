import { useState } from 'react'
import TripList from './components/TripList'
import CreateTrip from './components/CreateTrip'
import './App.css'

function App() {
  const [screen, setScreen] = useState('list') // 'list' | 'create'

  return (
    <div className="min-h-screen bg-amber-50">
      {screen === 'list' && (
        <TripList onCreateNew={() => setScreen('create')} />
      )}
      {screen === 'create' && (
        <CreateTrip onBack={() => setScreen('list')} />
      )}
    </div>
  )
}

export default App
