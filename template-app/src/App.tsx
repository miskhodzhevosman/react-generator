import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProjectPage from './modules/project/projectMainView.jsx'
import NomenclaturePage from './modules/nomenclature/nomenclatureMainView.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/nomenclature" element={<NomenclaturePage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
