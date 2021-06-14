import React from "react";
import { Redirect } from "@reach/router";
import { UserContext } from "../context/userContext";

export function PublicRoute({ Component, ...rest }) {
  return <Component {...rest} />;
}

export function PrivateRoute({ Component, ...rest }) {
  const { state } = React.useContext(UserContext);

  return state.isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Redirect from="" to="/login" noThrow />
  );
}

export function AuthRoute({ Component, ...rest }) {
  const { state } = React.useContext(UserContext);
  return state.isAuthenticated ? (
    <Redirect from="" to="/" noThrow />
  ) : (
    <Component {...rest} />
  );
}
