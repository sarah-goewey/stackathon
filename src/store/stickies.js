import axios from "axios";

const stickies = (state = [], action) => {
  if (action.type === "SET_ALL_STICKIES") {
    return action.stickies;
  }
  if (action.type === "ADD_STICKY") {
    return [...state, action.sticky];
  }
  if (action.type === "DESTROY_STICKY") {
    return state.filter((s) => s.id !== action.sticky.id);
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

export const destroySticky = (sticky) => {
  return async (dispatch) => {
    await axios.delete(`api/stickies/${sticky.id}`);
    dispatch({ type: "DESTROY_STICKY", sticky });
  };
};

export default stickies;
