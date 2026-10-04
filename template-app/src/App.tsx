import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CounterpartyPage from './modules/counterparty/counterpartyMainView'
import HistoricalcounterpartyPage from './modules/historicalcounterparty/historicalcounterpartyMainView'
import HistoricalprojectPage from './modules/historicalproject/historicalprojectMainView'
import HistoricalprojectitemPage from './modules/historicalprojectitem/historicalprojectitemMainView'
import HistoricalprojectstatusPage from './modules/historicalprojectstatus/historicalprojectstatusMainView'
import ProjectPage from './modules/project/projectMainView'
import ProjectfilePage from './modules/projectfile/projectfileMainView'
import ProjectitemPage from './modules/projectitem/projectitemMainView'
import ProjectstatusPage from './modules/projectstatus/projectstatusMainView'
import FinanceoperationtypePage from './modules/financeoperationtype/financeoperationtypeMainView'
import FinancialtransactionPage from './modules/financialtransaction/financialtransactionMainView'
import FactoryfilePage from './modules/factoryfile/factoryfileMainView'
import LocationPage from './modules/location/locationMainView'
import NomenclaturePage from './modules/nomenclature/nomenclatureMainView'
import NomenclaturefilePage from './modules/nomenclaturefile/nomenclaturefileMainView'
import NomenclatureimagePage from './modules/nomenclatureimage/nomenclatureimageMainView'
import './App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/counterparty" element={<CounterpartyPage />} />
          <Route path="/historicalcounterparty" element={<HistoricalcounterpartyPage />} />
          <Route path="/historicalproject" element={<HistoricalprojectPage />} />
          <Route path="/historicalprojectitem" element={<HistoricalprojectitemPage />} />
          <Route path="/historicalprojectstatus" element={<HistoricalprojectstatusPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/projectfile" element={<ProjectfilePage />} />
          <Route path="/projectitem" element={<ProjectitemPage />} />
          <Route path="/projectstatus" element={<ProjectstatusPage />} />
          <Route path="/financeoperationtype" element={<FinanceoperationtypePage />} />
          <Route path="/financialtransaction" element={<FinancialtransactionPage />} />
          <Route path="/factoryfile" element={<FactoryfilePage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/nomenclature" element={<NomenclaturePage />} />
          <Route path="/nomenclaturefile" element={<NomenclaturefilePage />} />
          <Route path="/nomenclatureimage" element={<NomenclatureimagePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
