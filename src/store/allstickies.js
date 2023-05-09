import axios from "axios";

const allStickies = (state = [], action) => {
  if (action.type === "SET_ALL_STICKIES") {
    return action.stickies;
  }
  if (action.type === "ADD_TO_ALL_STICKIES") {
    return [...state, action.sticky];
  }
  return state;
};

export const fetchAllStickies = () => {
  return async (dispatch) => {
    const response = await axios.get("api/stickies/");
    dispatch({ type: "SET_ALL_STICKIES", stickies: response.data });
  };
};

export const addToAllStickies = (sticky) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_TO_ALL_STICKIES", sticky });
  };
};

export default allStickies;
