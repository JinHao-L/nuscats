import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { State } from 'react-mapbox-gl/lib/map';

const Mapbox = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidGFua2FuZ2xpYW5nIiwiYSI6ImNrczJ2cmk3djFhaXgzMHFnczN2c2gwZDEifQ.C7B8A0Y-MhBdS98zxnDbeg',
});

type MapSettings = {
  center: [number, number];
  zoom: [number];
};

const defaultMapSettings: MapSettings = {
  center: [103.77808784502815, 1.4304135719534514],
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
