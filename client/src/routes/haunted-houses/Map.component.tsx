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
  type Haunts = {
    name: string;
    id: string;
    address: string;
    address2: string;
  }
  const [showPopup, setShowPopup] = useState(false);
  const [selectft, setFeat] = useState<Haunts>();

  const handleClick = (e: any) => {
    setShowPopup(true);
    const feat: number = e.currentTarget.id;
    const selected = features.map(ft => (
      {name: ft.properties.name, id: ft.properties.id, address: ft.properties.address, address2: ft.properties.address2}
    )).find(ft => ft.id === feat.toString());
    console.log(selected);
    setFeat(selected);
  };

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
        >
          <div onClick={handleClick}
          id={feature.properties.id}
          >📍</div>
        </Marker>
      )),
    [features]
  );

  const popups = useMemo(
    () =>
      features.map((feature) => (
        <Popup
          key={feature.properties.id}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          anchor='top'
          onClose={() => setShowPopup(false)}
        > {selectft && (

          <><h3
              className='text-black'
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {selectft.name}
            </h3><h4
              className='text-muted'
              style={{
                fontSize: '10px',
              }}
            >
                {selectft.address}
                <br />
                {selectft.address2}
              </h4></>
            )}
        </Popup>
      )),
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
      {showPopup && popups}
    </Map>
  );
};

export default MapBox;
