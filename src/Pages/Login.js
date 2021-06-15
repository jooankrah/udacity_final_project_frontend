import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "@reach/router";
import { UserContext } from "../context/userContext";
import { axiosInstance } from "../utils/axios";

export default function Login() {
  const { dispatch } = React.useContext(UserContext);

  const [loading, setloading] = React.useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axiosInstance.post("/users/login", values);
      response.data.status === 201 &&
        dispatch({
          type: "LOGIN",
          payload: { user: response.data.user, token: response.data.token },
        });
      message.success(response.data.message);
      return setloading(false);
    } catch (error) {
      alert("Error logging in. Please try again");
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          Or <Link to="/signup">SignUp now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
