import React, { useEffect, useRef } from "react";
import Home from "./Home";
import Login from "./Login";
import MyStickies from "./MyStickies";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchMyStickies, fetchAllStickies } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const prevAuth = useRef({});

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchAllStickies());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log("logged in");
      dispatch(fetchMyStickies());
    }
    if (!prevAuth.current.id && !auth.id) {
      console.log("logged out");
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  return (
    <div>
      <h1>spiffy_stickies</h1>
      {!auth.id && <Login />}
      {!!auth.id && (
        <div>
          <AppBar position="sticky">
            <Toolbar className="nav">
              <Link to="/">home</Link>
              <Link to="/mystickies">my stickies</Link>
              <Link to="/profile">my profile</Link>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mystickies" element={<MyStickies />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
