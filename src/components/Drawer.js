import React from "react";
import { Drawer, message } from "antd";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";

import "bootstrap/dist/css/bootstrap.min.css";

import { axiosInstance } from "../utils/axios";
import { CampgroundContext } from "../context/campgroundContext";

export default function LeftDrawer(props) {
  //get random id
  const fileId = uuidv4();

  //get put signed url
  React.useEffect(() => {
    async function getsignedUrl() {
      try {
        const response = axiosInstance.get("/campgrounds/signed-url", {
          params: {
            fileId,
          },
        });
        console.log(response.data);
      } catch (error) {
        return error;
      }
    }
  });

  //use campground context
  const { state, dispatch } = React.useContext(CampgroundContext);

  //set campground object state
  const [campground, setcampground] = React.useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  //handle text filed change
  const handlechange = (e) => {
    const { name, value } = e.target;
    setcampground((prevstate) => ({ ...prevstate, [name]: value }));
  };

  //handle image file field change
  const handleImageChange = async (e) => {
    setcampground((prevstate) => ({ ...prevstate, image: e.target.files[0] }));
    const response = await axiosInstance.get("/campgrounds/signed-url", {
      params: {
        fileId,
      },
    });
    console.log(fileId);
    console.log(response.data);
  };

  // handle  form submission
  const onFinish = async () => {
    try {
      console.log(campground);
      const response = await axiosInstance.post("/campgrounds/new", {
        Campground: {
          ...campground,
        },
      });
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
        <Form encType="multipart/form-data">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={campground.name}
              onChange={handlechange}
              placeholder="Enter name of camp here"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={campground.price}
              onChange={handlechange}
              placeholder="Enter price of camp here without currency"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={campground.description}
              onChange={handlechange}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="image"
              name="image"
              onChange={handleImageChange}
              label="Camp Photo"
            />
          </Form.Group>
        </Form>
        <Button
          variant="secondary"
          style={{ width: "30%" }}
          onClick={onFinish}
          type="submit"
        >
          Submit
        </Button>
      </Drawer>
    </>
  );
}
