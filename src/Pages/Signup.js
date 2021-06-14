import React from "react";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "@reach/router";
import { UserContext } from "../context/userContext";

export default function Signup() {
  const { dispatch } = React.useContext(UserContext);

  const [loading, setloading] = React.useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/createUsers",
        values
      );
      response.data.status === 201 &&
        dispatch({
          type: "LOGIN",
          payload: { user: response.data.user, token: response.data.token },
        });
      message.success(response.data.message);
      return setloading(false);
    } catch (error) {
      alert("Error signin up. Please try again");
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <Form
        name="signup"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="secondPassword"
          rules={[
            {
              required: true,
              message: "Please input your Password again!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Sign Up
          </Button>
          Or <Link to="/login">Login now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
