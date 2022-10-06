import React, {useState} from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = () => {
 
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle='mapbox://styles/mapbox/dark-v10'
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
    />
  )
}

export default MapBox;