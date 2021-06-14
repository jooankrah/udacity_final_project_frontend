import React from "react";
import { campgroundreducer } from "../reducers/Campgroundreducer";

const CampgroundContext = React.createContext();

const CampgroundProvider = (props) => {
  const initialValues = {
    campgrounds: [],
    campground: null,
    loading: false,
  };
  const [state, dispatch] = React.useReducer(campgroundreducer, initialValues);

  return (
    <CampgroundContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CampgroundContext.Provider>
  );
};

export { CampgroundProvider, CampgroundContext };
