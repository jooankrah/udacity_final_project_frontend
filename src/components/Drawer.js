import React from "react";
import { Drawer, Form, Button, Col, Row, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../utils/axios";
import { CampgroundContext } from "../context/campgroundContext";

export default function LeftDrawer(props) {
  const { state, dispatch } = React.useContext(CampgroundContext);

  const onFinish = async (values) => {
    try {
      console.log(values);
      const response = await axiosInstance.post(
        "http://localhost:3002/campgrounds/new",
        {
          campground: {
            ...values,
          },
        }
      );
      response.status === 201 &&
        dispatch({ type: "", payload: response.data.campground });
      message.success(response.data.message);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <>
      <Drawer
        title={props.title}
        width={720}
        onClose={props.onClose}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        // footer={
        //   <div
        //     style={{
        //       textAlign: "right",
        //     }}
        //   >
        //     <Button onClick={props.onClose} style={{ marginRight: 8 }}>
        //       Cancel
        //     </Button>
        //     <Button onClick={onFinish} type="primary">
        //       Submit
        //     </Button>
        //   </div>
        // }
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Title"
                rules={[{ required: true, message: "Please enter a name" }]}
              >
                <Input placeholder="Please enter a name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter a price" }]}
              >
                <Input addonBefore="GH¢ " placeholder="Please enter a price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  rows={4}
                  placeholder="please enter a description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input addonBefore="00233" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="image" label="Image">
                <Upload>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "50%", height: "40px" }}
              // loading={loading}
            >
              submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
