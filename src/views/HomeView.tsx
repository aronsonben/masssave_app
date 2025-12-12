import Map from '../Map'
import Hero from '../components/Hero'
import MapLegend from '../components/MapLegend'
import DataTable from '../components/DataTable'
import DevNote from '../components/DevNote'
import { useMapLegend } from '../hooks/useMapLegend'
import type { ViewType } from '../types/types'

interface HomeViewProps {
  onViewChange: (view: ViewType) => void
}

function HomeView({ onViewChange }: HomeViewProps) {
  const { toggleLayer, legendConfigs } = useMapLegend()
  return (
    <>
      <DevNote />
      <Hero />
      
      {/* Interactive Map Section */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-[OlympicSerif-Bold] text-[#253031] mb-6">
            MassSave + REJ: At A Glance
          </h2>
          <div className="grid lg:grid-cols-[1fr_280px] gap-6">
            <div className="h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <Map onLayerToggle={toggleLayer} />
            </div>
            <div className="lg:sticky lg:top-6 self-start">
              <MapLegend legendConfigs={legendConfigs} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 text-sm text-gray-600">
          <button 
            onClick={() => onViewChange('map')}
            className="hover:underline cursor-pointer"
          >
            Click here to view map full screen
          </button>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="py-12 px-8 bg-[#FCFAF0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
            Explore the Data
          </h2>
          <DataTable />
        </div>
        <div className="flex justify-center items-center mt-8 text-sm text-gray-600">
          <button 
            onClick={() => onViewChange('table')}
            className="hover:underline cursor-pointer"
          >
            Click here to dig deeper
          </button>
        </div>
      </section>

      {/* Data Insights Section */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
            Key Findings
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-[#253031] leading-relaxed">
              Key findings & related blog post series coming soon. 
              Please <span onClick={() => onViewChange('about')} className="text-blue-600 cursor-pointer underline">check out the About page</span> for more information in the meantime.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeView
