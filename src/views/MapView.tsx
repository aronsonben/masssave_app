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
        <p className="text-[#253031] font-sans leading-relaxed mb-4">
          Explore the map below to view MassSave participation rates across Census Tracts. &nbsp;
          <a href="#important-note" className="text-sm font-mono font-bold underline cursor-pointer">
            Important note on data.
          </a>
        </p>
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="h-[calc(100vh-250px)] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <Map onLayerToggle={toggleLayer} />
          </div>
          <div className="lg:sticky lg:top-6 self-start">
            <MapLegend legendConfigs={legendConfigs} />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
          <span id="important-note">
            <strong className="font-[OlympicSans-Bold]">Important Note:</strong> Not all data was fully transformed during the processing stage.
            As a result, some census tract areas may be missing data. I am actively working to resolve this issue.
          </span>
        </div>
      </div>
    </section>
  )
}

export default MapView
