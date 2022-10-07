import React, { useState, useMemo } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { features } from './haunted-houses';

const MapBox = () => {
  const [viewState, setViewState] = useState({
    longitude: -95.7219,
    latitude: 37.8,
    zoom: 3,
  });

  const markers = useMemo(() =>
    features.map((feature, idx) => (
      <Marker
        key={`${feature} ${idx}`}
        longitude={feature.geometry.coordinates[0]}
        latitude={feature.geometry.coordinates[1]}
      ></Marker>)
    ), [features]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: 600, height: 400 }}
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle='mapbox://styles/mapbox/dark-v10'
    >
    {markers}
    </Map>
  );
};

export default MapBox;
