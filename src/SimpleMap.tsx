import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function SimpleMap() {
  return (
    <MapContainer
      center={[42.3, -71.8]} // Latitude and Longitude for Massachusetts
      zoom={8} // Zoom level
      style={{ height: '100vh', width: '100%' }} // Full-screen map
    />
  );
}

export default SimpleMap;