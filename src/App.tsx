import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import './App.css'
import 'leaflet/dist/leaflet.css';
function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

function App() {
  const [clickedPosition, setClickedPosition] = useState(null);

  const handleMapClick = (latlng) => {
    console.log(latlng)
    setClickedPosition(latlng);
  };

  return (
    <div className='w-full h-full'>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100dvh', width: '100%' }}>
        <TileLayer
        
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onClick={handleMapClick} />
        <ViewportBounds />
      </MapContainer>

      {clickedPosition && (
        <div style={{ marginTop: '10px' }}>
          <strong>Координаты клика:</strong><br />
          Широта: {clickedPosition.lat.toFixed(5)}<br />
          Долгота: {clickedPosition.lng.toFixed(5)}
        </div>
      )}
    </div>
  );
}

export default App


function ViewportBounds() {
  const map = useMap();
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    const updateBounds = () => {
      const b = map.getBounds();
      setBounds({
        northEast: b.getNorthEast(),
        southWest: b.getSouthWest(),
      });
    };

    updateBounds(); // показать при загрузке

    map.on('moveend', updateBounds); // обновлять при перемещении/зуме

    return () => {
      map.off('moveend', updateBounds);
    };
  }, [map]);

  return bounds ? (
    <div style={{ marginTop: '10px' }} className='absolute z-[9999]'>
      <strong>Границы области просмотра:</strong><br />
      Северо-восток: {bounds.northEast.lat.toFixed(5)}, {bounds.northEast.lng.toFixed(5)}<br />
      Юго-запад: {bounds.southWest.lat.toFixed(5)}, {bounds.southWest.lng.toFixed(5)}
    </div>
  ) : null;
}