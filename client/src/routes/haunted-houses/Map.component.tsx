import React, { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { features } from './haunted-houses';

const MapBox = () => {
  const [viewState, setViewState] = useState({
    longitude: -95.7219,
    latitude: 37.8,
    zoom: 14,
  });
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { latitude, longitude },
      }: {
        coords: {
          latitude: number;
          longitude: number;
        };
      } = position;
      setViewState({ ...viewState, latitude, longitude, zoom: 13 });
    });
  }, []);

  const markers = useMemo(
    () =>
      features.map((feature) => (
        <Marker
          key={feature.properties.id}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
        ></Marker>
      )),
    [features]
  );

  const popups = useMemo(
    () =>
      features.map((feature) => {
        return (
          <>
            {showPopup && (
              <Popup
                key={feature.properties.id}
                longitude={feature.geometry.coordinates[0]}
                latitude={feature.geometry.coordinates[1]}
                anchor='top'
                onClose={() => setShowPopup(false)}
              >
                <h3
                  className='text-black'
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {feature.properties.name}
                </h3>
                <h4
                  className='text-muted'
                  style={{
                    fontSize: '10px',
                  }}
                >
                  {feature.properties.address}
                  <br />
                  {feature.properties.address2}
                </h4>
              </Popup>
            )}
          </>
        );
      }),
    [features]
  );

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: 600, height: 400 }}
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle='mapbox://styles/mapbox/dark-v10'
    >
      {markers}
      {popups}
    </Map>
  );
};

export default MapBox;
