import React, { Component } from "react";
import { Router } from "@reach/router";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Detail from "../Pages/Detail";
import { PublicRoute, PrivateRoute, AuthRoute } from "./RouteTypes";
import MyCampground from "../Pages/MyCampground";
import addNew from "../Pages/addNew";
import Landing from "../Pages/Landing";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <AuthRoute Component={Login} path="login" />
        <AuthRoute Component={Signup} path="/signup" />
        <PrivateRoute Component={MyCampground} path="/mycampground" />
        <PrivateRoute Component={addNew} path="/addnew" />
        <PublicRoute Component={Landing} path="/" />
        <PublicRoute Component={Home} path="/allcampgrounds" />
        <PublicRoute Component={Detail} path="campground/:id" />
      </Router>
    );
  }
}
