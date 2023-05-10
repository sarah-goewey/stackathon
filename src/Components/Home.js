import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import Feed from "./Feed";
import Button from "@mui/material/Button";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <br />
        <h2>
          welcome {auth.username}!{" "}
          <Button color="secondary" onClick={() => dispatch(logout())}>
            logout
          </Button>
        </h2>
      </div>
      <Feed />
    </div>
  );
};

export default Home;
