import axios from "axios";

const allStickies = (state = [], action) => {
  if (action.type === "SET_ALL_STICKIES") {
    return action.stickies;
  }
  return state;
};

export const fetchAllStickies = () => {
  return async (dispatch) => {
    const response = await axios.get("api/stickies/");
    dispatch({ type: "SET_ALL_STICKIES", stickies: response.data });
  };
};

export default allStickies;
