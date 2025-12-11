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
        return <HomeView onViewChange={setCurrentView} />
      case 'map':
        return <MapView />
      case 'table':
        return <TableView />
      case 'about':
        return <AboutView />
      default:
        return <HomeView onViewChange={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF0]">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      {renderView()}

      {/* Footer */}
      <footer className="bg-[#253031] text-[#FCFAF0] py-2 px-8 mt-12">
        <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto italic font-mono text-xs">
          <img src="/monstera.png" alt="monstera leaf" className="w-6 h-6 opacity-75"/>
          <p className="opacity-75">this has been another <a href="https://concourse.codes" className="underline font-bold" target="_blank" rel="noopener noreferrer">Concourse Codes</a> creation.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
