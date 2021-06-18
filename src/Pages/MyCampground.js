import React from "react";
import { Empty, Button, message, Row, Spin } from "antd";
import LeftDrawer from "../components/Drawer";
import { axiosInstance } from "../utils/axios";
import { CampgroundContext } from "../context/campgroundContext";
import { CampCard } from "../components/CampCard";
import { navigate } from "@reach/router";

export default function MyCampground() {
  const [visible, setvisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const { state, dispatch } = React.useContext(CampgroundContext);

  React.useEffect(() => {
    async function getusercampgrounds() {
      try {
        setloading(true);
        dispatch({ type: "FETCHING_CAMPGROUND" });
        const response = await axiosInstance.get(
          "/campgrounds/alluserscampground/"
        );
        response.data.status === 200 &&
          dispatch({
            payload: response.data.campgrounds,
            type: "ALL_CAMPGROUND_LOADED",
          });
        message.success(
          `${response.data.campgrounds.length} Camgrounds loaded succesfully`
        );
        setloading(false);
      } catch (error) {
        message.error(error.message);
        setloading(false);
      }
    }

    getusercampgrounds();
  }, [dispatch]);

  return (
    <>
      {!loading || state.campgounds ? (
        !state.campgrounds.length ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<span>No Campgrounds Available</span>}
          >
            <Button type="primary" onClick={() => setvisible(true)}>
              Create a New Camp
            </Button>
          </Empty>
        ) : (
          <>
            <Button
              type="primary"
              style={{ marginBottom: "20px" }}
              onClick={() => navigate("/addnew")}
            >
              Create a New Camp
            </Button>
            <Row gutter={[16, 16]}>
              {state.campgrounds &&
                state.campgrounds.map((campground) => {
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
        )
      ) : (
        <Spin className="spinner" size="large" />
      )}

      <LeftDrawer
        onClose={() => setvisible(false)}
        visible={visible}
        title="Create new Campground"
      />
    </>
  );
}
