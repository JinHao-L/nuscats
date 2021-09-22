import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  canRoute: boolean;
  elseRedirectTo: string;
  // All other props
  [x: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  canRoute,
  elseRedirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        canRoute ? <Component {...props} /> : <Redirect to={elseRedirectTo} />
      }
    />
  );
};

export default PrivateRoute;
