import React, {useState} from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = () => {
  const [LngLat, setLngLat] = useState({
    lng: -95.7219,
    lat: 37.8,
    zoom: 3
  });


  return (
    <Map
      initialViewState={{
        longitude: -95.7219,
        latitude: 37.8,
        zoom: 3
      }}
      style={{width: 600, height: 400}}
      mapStyle='mapbox://styles/mapbox/dark-v10'
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
    />
  )
}

export default MapBox;