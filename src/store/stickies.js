import axios from "axios";

const stickies = (state = [], action) => {
  if (action.type === "SET_ALL_STICKIES") {
    return action.stickies;
  }
  if (action.type === "ADD_STICKY") {
    return [...state, action.sticky];
  }
  return state;
};

export const fetchStickies = () => {
  return async (dispatch) => {
    const response = await axios.get("api/stickies/");
    dispatch({ type: "SET_ALL_STICKIES", stickies: response.data });
  };
};

export const createSticky = (sticky) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/stickies", sticky, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "ADD_STICKY", sticky: response.data });
  };
};

export default stickies;
