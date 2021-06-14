import React, { Component } from "react";
import { Layout } from "antd";
import AppMenu from "./Menu";
import { UserContextProvider } from "../context/userContext";
import { CampgroundProvider } from "../context/campgroundContext";

const { Header, Content, Footer } = Layout;

export class Mainlayout extends Component {
  render() {
    return (
      <UserContextProvider>
        <CampgroundProvider>
          <Layout className="layout">
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
              <div className="logo" />
              <AppMenu />
            </Header>
            <Content style={{ padding: "15px 60px 0px 60px", marginTop: 64 }}>
              <div className="site-layout-content">{this.props.children}</div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              My Yelp Camp ©2021 Created by The Jooankrah
            </Footer>
          </Layout>
        </CampgroundProvider>
      </UserContextProvider>
    );
  }
}

export default Mainlayout;
