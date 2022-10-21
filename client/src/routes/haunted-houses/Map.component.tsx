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
// import distance from '@turf/distance';
import { Units, Coord } from '@turf/helpers';
// import { Units, Coord } from "@turf/helpers";
import { distance } from '@turf/turf';

type Features = {
  address: string;
  address2: string;
  cta_link: string;
  cta_text: string;
  distance: number;
  id: string;
  latitude: string;
  location_type: string;
  longitude: string;
  name: string;
  phone_number: string;
  phone_number_formatted: string;
  terms: string;
}[];

const MapBox = () => {
  const [sortedFeatures, setSortedFeatures] = useState<Features>([]);
  const [userLocation, setUserLocation] = useState<number[]>([])
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
      setUserLocation([longitude, latitude])
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

  // console.log(Units)
  // calculate distance for closes haunted house
  useEffect(() => {
    if (userLocation.length) {
    const featuresWithDistance = features.map((feature: any) => {
      return Object.defineProperty(feature.properties, 'distance', {
        value: distance(userLocation, feature.geometry, {
          units: 'miles',
        }),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });
    featuresWithDistance.sort((a, b) => {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    setSortedFeatures(featuresWithDistance);
  }
  },[userLocation])

  console.log(sortedFeatures)

  return (
    <>
      <div className='w-100 d-flex flex-row'>
        <div className='w-25'>
          <>
          <h1>Search for Haunts</h1>
          <div className='input-group w-75 mx-auto'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter name or location'
            />
            <button className='btn btn-light'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </div>
          <div className='mt-3' style={{overflowY: 'scroll', borderTop: '1px solid white', height: "calc(100vh - 100px)" }}>

          {sortedFeatures.map((feature: any) => (
            <div key={feature.id}>
              <span className='text-muted'>{Math.round(feature.distance * 100) / 100} miles away</span>
              <h3>{feature.name}</h3>
              <div></div>
            </div>
          ))}
          </div>
          </>
        </div>

        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{
            position: 'relative',
            float: 'right',
            width: '100%',
            height: '100vh',
          }}
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
    </>
  );
};

export default MapBox;
