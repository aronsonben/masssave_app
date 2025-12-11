import { PARTICIPATION_BUCKETS } from '../types/mock';

interface MapLegendProps {
  title?: string;
}

function MapLegend({ title = "Participation Rate" }: MapLegendProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-serif font-bold text-lg mb-3 text-[#253031]">{title}</h3>
      <div className="space-y-2">
        {PARTICIPATION_BUCKETS.map((bucket) => (
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
  );
}

export default MapLegend;
