import { useState, useEffect, useRef } from 'react';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';

export type Coords = Position['coords'];

const options: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 5000,
};

const useGeolocation = (): Coords | undefined => {
  const idRef = useRef<string>();
  const [coords, setCoords] = useState<Coords | undefined>();

  const setUpWatch = async () => {
    // This might drain battery so maybe change to polling
    const id = await Geolocation.watchPosition(options, (pos) => {
      setCoords(pos?.coords);
    });
    idRef.current = id;
  };

  useEffect(() => {
    setUpWatch();
    return () => {
      if (idRef.current) Geolocation.clearWatch({ id: idRef.current });
    };
  }, []);

  return coords;
};

export default useGeolocation;

export const getCenter = (c: Coords): [number, number] => [
  c.longitude,
  c.latitude,
];
