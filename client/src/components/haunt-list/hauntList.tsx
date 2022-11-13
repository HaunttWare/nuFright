// eslint-disable-next-line react-hooks/rules-of-hooks
import React, {useState, useEffect} from 'react';
import {features} from '../../routes/haunted-houses/haunted-houses';
import {distance} from '@turf/turf';

type Features = {
  geometry: {
    type: string;
    coordinates: [number, number];
  }
  properties: {
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
  };
}[]

type ClosestTen = any[]

const HauntList = () => {
  const [sortedFeatures, setSortedFeatures] = useState<Features>([]);
  const closestTen: ClosestTen = []
  const [userLocation, setUserLocation] = useState<number[]>([]);
  const [viewState, setViewState] = useState({
    longitude: -95.7219,
    latitude: 37.8,
    zoom: 3,
  });

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
      setUserLocation([longitude, latitude]);
    });
  }, []);

  // calculate distance for closes haunted house
  useEffect(() => {
    if (userLocation.length) {
      const featuresWithDistance = features.map((feature: any) => {
        Object.defineProperty(feature.properties, 'distance', {
          value: distance(userLocation, feature.geometry, {
            units: 'miles',
          }),
          writable: true,
          enumerable: true,
          configurable: true,
        });
        return feature;
      });
      featuresWithDistance.sort((a, b) => {
        if (a.properties.distance > b.properties.distance) {
          return 1;
        }
        if (a.properties.distance < b.properties.distance) {
          return -1;
        }
        return 0;
      });
      if (featuresWithDistance.length) {
        for (let i = 0; i < 10; i++) {
         closestTen.push(featuresWithDistance[i]) 
        }
      }
      setSortedFeatures(closestTen);
    }
  }, [userLocation]);
  
  return sortedFeatures.length ? (
  <div className='container haunts'>
    <h3 className='text-center mb-4 display-6 text-white'>
      List of Haunted Houses</h3>
    <div 
    className='row align-items-center no-gutters margin-40px-bottom'
    style={{textAlign: 'center', color: 'white'}}
    >
      {sortedFeatures.map((feature: any) => (
      <ul>{feature.properties.name}</ul>
      ))}
    </div>
  </div>
  ) : null

};

export default HauntList;
