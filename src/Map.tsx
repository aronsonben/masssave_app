import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import { Layer } from 'leaflet';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { PARTICIPATION_BUCKETS } from './types/buckets';

interface MassSaveFeature extends Feature {
  properties: {
    town: string;
    electric_participation_rate_avg: number;
    gas_participation_rate_avg: number;
    REJ__flag_: string;
    POPULATION: number;
    [key: string]: string | number;
  };
  geometry: Geometry;
}

/** Define the popup */
const onEachFeature = (feature: MassSaveFeature, layer: Layer) => {
  const props = feature.properties;
  const electricRateAvg = props.electric_participation_rate_avg || 0;
  const gasRateAvg = props.gas_participation_rate_avg || 0;
  const popupContent = `
        <div style="
          padding: 16px; 
          background-color: #FCFAF0; 
          border: 1px solid #253031;
          border-radius: 10px;
          font-family: 'OlympicSans', sans-serif;
          color: #253031;
        ">
          <h3 style="
            font-family: 'OlympicSerif', serif;
            font-size: 1.25rem;
            font-weight: 500;
            margin: 0 0 12px 0;
            color: #253031;
            text-align: center;
            text-transform: capitalize;
          ">${props.town}</h3>
          <table style="
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
          ">
            <tr style="
              background-color: #F8F5E8;
              transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='#E6DCC6'" onmouseout="this.style.backgroundColor='#F8F5E8'">
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans-Bold', sans-serif;
                font-weight: bold;
                width: 60%;
              ">Population:</td>
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans', sans-serif;
              ">${props.POPULATION.toLocaleString()}</td>
            </tr>
            <tr style="
              background-color: #FCFAF0;
              transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='#E6DCC6'" onmouseout="this.style.backgroundColor='#FCFAF0'">
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans-Bold', sans-serif;
                font-weight: bold;
              ">Electric Participation:</td>
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans', sans-serif;
              ">${electricRateAvg.toFixed(2)}%</td>
            </tr>
            <tr style="
              background-color: #F8F5E8;
              transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='#E6DCC6'" onmouseout="this.style.backgroundColor='#F8F5E8'">
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans-Bold', sans-serif;
                font-weight: bold;
              ">Gas Participation:</td>
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans', sans-serif;
              ">${gasRateAvg.toFixed(2)}%</td>
            </tr>
            <tr style="
              background-color: #FCFAF0;
              transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='#E6DCC6'" onmouseout="this.style.backgroundColor='#FCFAF0'">
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans-Bold', sans-serif;
                font-weight: bold;
              ">REJ Status:</td>
              <td style="
                padding: 8px 12px;
                font-family: 'OlympicSans', sans-serif;
              ">${props.REJ__flag_}</td>
            </tr>
          </table>
        </div>
    `;

  // Create popup with options
  const popup = L.popup({
    maxWidth: 300,
    minWidth: 250,
    autoPan: true,
    closeButton: true,
    autoClose: false,
    closeOnEscapeKey: true,
    className: 'custom-popup'
  }).setContent(popupContent);

  layer.bindPopup(popup);
};

const getColor = (participation: number) => {
  const bucket = PARTICIPATION_BUCKETS.find(b => b.test(participation));
  return bucket?.color ?? '#cccccc';
}

const getPopulationColor = (population: number) => {
  if (population === 0) return '#efefef'
  if (population < 5000) return '#fee0d2'
  if (population < 10000) return '#fc9272'
  if (population < 25000) return '#de2d26'
  return '#a50f15'
}

const getStatusColor = (status?: string) => {
  if (status === 'Yes') return '#1a9850'
  if (status === 'No') return '#dcdcdc'
  return '#bdbdbd'
}

type LayerConfig = {
  key: keyof MassSaveFeature['properties'];
  name: string;
  defaultVisible?: boolean;
  getFillColor: (props?: MassSaveFeature['properties']) => string;
}

const polygonBaseStyle = {
  weight: 1,
  opacity: 0.8,
  color: '#666',
  fillOpacity: 0.7,
}

const propertyLayers: LayerConfig[] = [
  {
    key: 'electric_participation_rate_avg',
    name: 'Electric Participation Rate',
    defaultVisible: true,
    getFillColor: props => getColor(props?.electric_participation_rate_avg ?? 0),
  },
  {
    key: 'gas_participation_rate_avg',
    name: 'Gas Participation Rate',
    getFillColor: props => getColor(props?.gas_participation_rate_avg ?? 0),
  },
  {
    key: 'POPULATION',
    name: 'Population',
    getFillColor: props => getPopulationColor(Number(props?.POPULATION ?? 0)),
  },
  {
    key: 'REJ__flag_',
    name: 'REJ Status',
    getFillColor: props => getStatusColor(String(props?.REJ__flag_ ?? '')), 
  },
]

interface GeoJSONMapProps {
  onLayerToggle?: (layerKey: string, isActive: boolean) => void;
}

function GeoJSONMap({ onLayerToggle }: GeoJSONMapProps) {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<Geometry, MassSaveFeature['properties']> | null>(null);
  const [error, setError] = useState<string | null>(null);

    // Determine the GeoJSON URL based on environment
  const getGeoJsonUrl = () => {
    if (import.meta.env.MODE === 'development') {
      return '/data/rej_with_masssave_participation.geojson';
    } else {
      return '/api/geojson';
    }
  };

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        setError(null);
        const url = getGeoJsonUrl();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json() as FeatureCollection<Geometry, MassSaveFeature['properties']>;
        setGeoJsonData(data);
      } catch (err) {
        console.log("Map Error: ", err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    loadGeoJson();
  }, []);

  return (
    <MapContainer center={[42.3, -71.8]} zoom={8} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LayersControl position="topright">
        {geoJsonData && propertyLayers.map(layer => (
          <LayersControl.Overlay
            key={String(layer.key)}
            name={layer.name}
            checked={layer.defaultVisible}
          >
            <GeoJSON
              eventHandlers={{
                add: () => onLayerToggle?.(String(layer.key), true),
                remove: () => onLayerToggle?.(String(layer.key), false),
              }}
              data={geoJsonData}
              style={(feature?: Feature<Geometry, MassSaveFeature['properties']>) => {
                const props = (feature as MassSaveFeature | undefined)?.properties;
                return {
                  ...polygonBaseStyle,
                  fillColor: layer.getFillColor(props),
                };
              }}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>
        ))}
        {error && <p className="text-red-500">{error}</p>}
      </LayersControl>
    </MapContainer>
  );
}

export default GeoJSONMap;