import axios from "axios";

const myStickies = (state = [], action) => {
  if (action.type === "SET_MY_STICKIES") {
    return action.stickies;
  }
  if (action.type === "ADD_STICKY") {
    return [...state, action.sticky];
  }
  return state;
};

export const fetchMyStickies = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("api/stickies/user", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_MY_STICKIES", stickies: response.data });
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

export default myStickies;
