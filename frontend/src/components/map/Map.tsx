import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { State } from 'react-mapbox-gl/lib/map';

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN as string,
});

type MapSettings = {
  center: [number, number];
  zoom: [number];
};

const defaultMapSettings: MapSettings = {
  center: [103.772663576, 1.290665504],
  zoom: [15.5],
};

type MapProps = React.ComponentProps<typeof Mapbox> & {
  getRef?: (s: State | undefined) => void;
};

const Map: React.FC<MapProps> = ({ getRef, ...props }) => {
  return (
    <Mapbox
      ref={(mapRef) => getRef && getRef(mapRef?.state)}
      {...defaultMapSettings}
      {...props}
    >
      {props.children}
    </Mapbox>
  );
};

export default Map;
