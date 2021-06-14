import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Rate,
  Button,
  Modal,
  Spin,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import LeftDrawer from "../components/Drawer";
import { CampgroundContext } from "../context/campgroundContext";
import { navigate, useParams } from "@reach/router";
import { CampCard } from "../components/CampCard";
import { axiosInstance } from "../utils/axios";

const { Meta } = Card;

const { Paragraph } = Typography;
const { confirm } = Modal;

export default function Detail() {
  const { state, dispatch } = React.useContext(CampgroundContext);
  const params = useParams();

  React.useEffect(() => {
    async function getCampground() {
      try {
        dispatch({ type: "FETCHING_CAMPGROUND" });
        const response = await axiosInstance.get(
          "http://localhost:3002/campgrounds/getCampground/",
          {
            params: {
              id: params.id,
            },
          }
        );
        response.data.status === 200 &&
          dispatch({
            type: "CAMPGROUND_FETCHED",
            payload: response.data.campground,
          });
      } catch (error) {
        console.log(error);
      }
    }

    getCampground();

    // return () => {
    //   // cleanup
    // };
  }, [dispatch, params.id]);

  const [user, setuser] = useState(true);

  const [visible, setvisible] = useState(false);
  const [loading, setloading] = useState(true);

  const onConfirmDelete = async () => {
    try {
      setloading(true);

      const response = await axiosInstance.delete(
        "http://localhost:3002/campgrounds/delete",
        {
          params: {
            id: params.id,
          },
        }
      );
      response.data.status === 200 &&
        dispatch({ type: "CAMPGROUND_DELETED", payload: params.id });
      setloading(false);
      navigate("/");
      message.success(response.data.message);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const Showconfirmdelete = () => {
    confirm({
      title: "Do you want to delete this item?",
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content:
        "When you clicked the okay button, this item will be deleted permanently",
      onOk() {
        onConfirmDelete();
      },
      onCancel() {},
    });
  };

  return (
    <div>
      {!loading || state.campground ? (
        <>
          <Row gutter={[16, 16]}>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    style={{
                      height: "400px",
                      objectFit: "fill",
                      objectPosition: "top",
                    }}
                    src={state.campground.image}
                  />
                }
              >
                <Meta
                  title={`${state.campground.name}  -  GH¢ ${state.campground.price}`}
                />
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card style={{ width: "100%" }}>
                <Meta
                  description={
                    <>
                      <Paragraph>{state.campground.description}</Paragraph>
                      <h2>Rating</h2>
                      <Rate disabled defaultValue={4} />
                      <br />
                      {user ? (
                        <>
                          <Button
                            onClick={() => setvisible(true)}
                            style={{ margin: 5 }}
                            type="primary"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={Showconfirmdelete}
                            style={{ margin: 10 }}
                            type="danger"
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  }
                />
              </Card>
            </Col>
          </Row>
          <Divider orientation="left">
            <h3>Other campgrounds you may like</h3>
          </Divider>
          <Row gutter={[16, 16]}>
            {state.campgrounds &&
              state.campgrounds
                .filter((item) => item._id !== params.id)
                .map((campground) => {
                  return (
                    <CampCard
                      key={campground._id}
                      title={campground.name}
                      image={campground.image}
                      url={`/campground/${campground._id}`}
                      price={campground.price}
                      description={campground.description}
                    />
                  );
                })}
          </Row>
        </>
      ) : (
        <Spin className="spinner" size="large" />
      )}
      <LeftDrawer
        onClose={() => setvisible(false)}
        visible={visible}
        title="Edit Details"
      />
    </div>
  );
}
