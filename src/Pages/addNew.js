import React from "react";
import { message, Button } from "antd";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

import { axiosInstance } from "../utils/axios";
import { CampgroundContext } from "../context/campgroundContext";
import axios from "axios";
import { navigate } from "@reach/router";

export default function LeftDrawer(props) {
  //get random id
  //   const fileId = `image${Date.now()}.jpg`;
  const [s3URL, sets3URL] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [fileId, setfileId] = React.useState(`image${Date.now()}.jpg`);
  //get put signed url
  React.useEffect(() => {
    async function getsignedUrl() {
      try {
        const response = await axiosInstance.get("/campgrounds/signed-url", {
          params: {
            fileId,
          },
        });
        sets3URL(response.data.url);
      } catch (error) {
        return error;
      }
    }
    getsignedUrl();
  }, []);

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
  };

  // handle  form submission
  const onFinish = async () => {
    try {
      //upload image to s3
      setloading(true);
      const response = await axios.put(s3URL, campground.image);
      response.status === 200 &&
        (await axiosInstance.post("/campgrounds/new", {
          Campground: {
            ...campground,
            image: fileId,
          },
        }));
      message.success("Campground created successfully");
      navigate("/");
    } catch (error) {
      setloading(false);
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <>
      <Form encType="multipart/form-data">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
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
            required
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
            required
            id="image"
            name="image"
            onChange={handleImageChange}
            label="Camp Photo"
          />
        </Form.Group>
      </Form>
      <Button
        type="primary"
        disabled={
          (campground.name && campground.price && campground.image) === ""
        }
        style={{ width: "30%" }}
        onClick={onFinish}
        loading={loading}
      >
        Submit
      </Button>
    </>
  );
}
