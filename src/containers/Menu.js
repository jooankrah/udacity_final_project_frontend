import React, { useState } from "react";
import { Menu, message } from "antd";
import { Link } from "@reach/router";
import { UserContext } from "../context/userContext";
import { axiosInstance } from "../utils/axios";
const { SubMenu } = Menu;

export default function AppMenu() {
  const [selectedMenu, setselectedMenu] = useState("1");

  const { state, dispatch } = React.useContext(UserContext);

  const onLogout = async () => {
    try {
      const response = await axiosInstance.post("users/logout");
      console.log(response.data);
      if (response.data.status === 200) {
        dispatch({
          type: "LOGOUT",
        });

        message.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Could not logout, Something went wrong");
    }
  };

  return (
    <>
      {!state.isAuthenticated ? (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedMenu]}
          onClick={(e) => setselectedMenu(e.key)}
        >
          <Menu.Item key="1">
            <Link to="/">All campgrounds</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="about">About</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="contact-us">Contact Us</Link>
          </Menu.Item>
          <Menu.Item style={{ left: "50%" }} key="login">
            <Link to="login">Login</Link>
          </Menu.Item>
          <Menu.Item style={{ left: "50%" }} key="signup">
            <Link to="signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedMenu]}
          onClick={(e) => setselectedMenu(e.key)}
        >
          <Menu.Item key="1">
            <Link to="/">All campgrounds</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="campground/detail">My campgrounds</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="about">About</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="contact-us">Contact Us</Link>
          </Menu.Item>
          <SubMenu
            style={{ left: "30%" }}
            key="user"
            title={`Welcome, ${state.user.username}`}
          >
            <Menu.Item key="logout" onClick={onLogout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      )}
    </>
  );
}
