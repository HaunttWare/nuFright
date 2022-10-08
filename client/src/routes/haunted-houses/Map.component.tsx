import React, { useState, useMemo, useEffect } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl as GeolocationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { features } from './haunted-houses';

const MapBox = () => {
  const [viewState, setViewState] = useState({
    longitude: -95.7219,
    latitude: 37.8,
    zoom: 3,
  });
  type Haunts = {
    name: string;
    latitude: string;
    longitude: string;
    id: string;
    address: string;
    address2: string;
  };
  const [showPopup, setShowPopup] = useState(false);
  const [featurePopup, setFeaturePopup] = useState<Haunts>({} as Haunts);

  const handleClick = (e: any) => {
    setShowPopup(true);
    const feature: number = e.currentTarget.id;
    const featurePopup = features
      .map((feature) => ({
        name: feature.properties.name,
        latitude: feature.properties.latitude,
        longitude: feature.properties.longitude,
        id: feature.properties.id,
        address: feature.properties.address,
        address2: feature.properties.address2,
      }))
      .find((ft) => ft.id === feature.toString());
    if (featurePopup == null) return null;

    setFeaturePopup(featurePopup);
  };

  // get user location
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
      setViewState({ ...viewState, latitude, longitude, zoom: 13.5 });
    });
  }, []);

  // set the haunted houses on the map
  const markers = useMemo(
    () =>
      features.map((feature) => (
        <Marker
          key={feature.properties.id}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
        >
          <div onClick={handleClick} id={feature.properties.id}>
            👻
          </div>
        </Marker>
      )),
    [features]
  );


  return (
    <div>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ position: 'relative', width: '100vw', height: '100vh' }}
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/dark-v10'
        onRender={(e) => e.target.resize()}
      >
        <GeolocationControl position='top-left' />
        <FullscreenControl position='top-left' />
        <NavigationControl position='top-left' />
        <ScaleControl />
        {markers}
        {showPopup && (
          <Popup
            anchor='top'
            longitude={Number(featurePopup.longitude)}
            latitude={Number(featurePopup.latitude)}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            <>
              <h3
                className='text-black'
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {featurePopup.name}
              </h3>
              <h4
                className='text-muted'
                style={{
                  fontSize: '10px',
                }}
              >
                {featurePopup.address}
                <br />
                {featurePopup.address2}
              </h4>
            </>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
