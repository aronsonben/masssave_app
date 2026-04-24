import { useState } from 'react'
import type { ViewType } from './types/types'
import Header from './components/Header'
import HomeView from './views/HomeView'
import MapView from './views/MapView'
import TableView from './views/TableView'
import AboutView from './views/AboutView'
import Footer from './components/Footer'
import DevNote from './components/DevNote'

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

      <DevNote />
      <Footer />
    </div>
  )
}

export default App
