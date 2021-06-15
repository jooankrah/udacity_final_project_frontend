import React from "react";
import { message, Row } from "antd";
import { CampCard } from "../components/CampCard";
import { axiosInstance } from "../utils/axios";
import { CampgroundContext } from "../context/campgroundContext";

export default function Home() {
  const { state, dispatch } = React.useContext(CampgroundContext);
  React.useEffect(() => {
    async function getAllCampgounds() {
      try {
        dispatch({ type: "FETCHING_CAMPGROUND" });
        const response = await axiosInstance.get("/campgrounds/");
        response.status === 200 &&
          dispatch({
            type: "ALL_CAMPGROUND_LOADED",
            payload: response.data.allCampgrounds,
          });
        message.success("campgrounds loaded successfully");
      } catch (error) {
        console.log(error);
        message.error("Oops! Something went wrong. Please refresh the page");
      }
    }
    getAllCampgounds();
  }, [dispatch]);

  return (
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
  );
}
