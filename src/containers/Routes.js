import React, { Component } from "react";
import { Router } from "@reach/router";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Detail from "../Pages/Detail";
import { PublicRoute, PrivateRoute, AuthRoute } from "./RouteTypes";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <AuthRoute Component={Login} path="login" />
        <AuthRoute Component={Signup} path="/signup" />
        <PublicRoute Component={Home} path="/" />
        <PublicRoute Component={Detail} path="campground/:id" />
      </Router>
    );
  }
}
