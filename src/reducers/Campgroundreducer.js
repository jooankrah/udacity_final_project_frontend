export const campgroundreducer = (state, action) => {
  switch (action.type) {
    case "CREATED_CAMPGROUND":
      return {
        ...state,
        campgrounds: state.campgrounds.push(action.payload),
      };
    case "FETCHING_CAMPGROUND":
      return {
        ...state,
        loading: true,
      };
    case "ALL_CAMPGROUND_LOADED":
      return {
        ...state,
        campgrounds: action.payload,
        loading: false,
      };
    case "CAMPGROUND_FETCHED":
      return {
        ...state,
        loding: false,
        campground: action.payload,
      };
    case "CAMPGROUND_DELETED":
      return {
        ...state,
        loading: false,
        campgrounds: state.campgrounds.filter(
          (item) => item._id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
