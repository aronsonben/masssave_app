import type { Bucket } from "../types/types";

interface LegendConfig {
  id: string;
  title: string;
  buckets: Bucket[];
}

interface MapLegendProps {
  legendConfigs: LegendConfig[];
}

function MapLegend({ legendConfigs }: MapLegendProps) {
  if (legendConfigs.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-sm text-gray-500 italic">No layers selected</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {legendConfigs.map((config) => (
        <div key={config.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-serif font-bold text-lg mb-3 text-[#253031]">{config.title}</h3>
          <div className="space-y-2">
            {config.buckets.map((bucket) => (
              <div key={bucket.id} className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: bucket.color }}
                />
                <span className="text-sm text-[#253031]">{bucket.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MapLegend;
