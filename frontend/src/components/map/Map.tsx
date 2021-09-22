import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { State } from 'react-mapbox-gl/lib/map';

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN as string,
});

type MapSettings = {
  center: [number, number];
  zoom: [number];
  maxBounds: [[number, number], [number, number]];
};

const defaultMapSettings: MapSettings = {
  center: [103.772663576, 1.290665504],
  zoom: [15.5],
  maxBounds: [
    [103.602104, 1.201885], // Southwest coordinates
    [104.048767, 1.491226], // Northeast coordinates
  ],
};
// 103.602104,1.201885,104.048767,1.491226
// 103.674202,1.165157,103.977013,1.506670
type MapProps = React.ComponentProps<typeof Mapbox> & {
  getRef?: (s: State | undefined) => void;
};

const Map: React.FC<MapProps> = ({ getRef, ...props }) => {
  return (
    <Mapbox
      className="map map-container"
      ref={(mapRef) => getRef && getRef(mapRef?.state)}
      {...defaultMapSettings}
      {...props}
    >
      {props.children}
    </Mapbox>
  );
};

export default Map;
