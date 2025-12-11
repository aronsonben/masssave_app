import { useState } from 'react'
import type { ViewType } from './types/types'
import Header from './components/Header'
import HomeView from './views/HomeView'
import MapView from './views/MapView'
import TableView from './views/TableView'
import AboutView from './views/AboutView'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />
      case 'map':
        return <MapView />
      case 'table':
        return <TableView />
      case 'about':
        return <AboutView />
      default:
        return <HomeView />
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF0]">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      {renderView()}

      {/* Footer */}
      <footer className="bg-[#253031] text-[#FCFAF0] py-6 px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="opacity-75">Data visualization for MassSave and REJ analysis</p>
        </div>
      </footer>
    </div>
  )
}

export default App
