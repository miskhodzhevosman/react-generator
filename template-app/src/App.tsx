import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainPage from './modules/entity/entityMainView.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/entity" element={<MainPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
