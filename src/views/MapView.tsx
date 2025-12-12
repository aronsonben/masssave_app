import Map from '../Map'
import MapLegend from '../components/MapLegend'
import { useMapLegend } from '../hooks/useMapLegend'

function MapView() {
  const { toggleLayer, legendConfigs } = useMapLegend()

  return (
    <section className="py-12 px-8 bg-white min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
          MassSave + REJ: Interactive Map
        </h2>
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="h-[calc(100vh-250px)] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <Map onLayerToggle={toggleLayer} />
          </div>
          <div className="lg:sticky lg:top-6 self-start">
            <MapLegend legendConfigs={legendConfigs} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapView
