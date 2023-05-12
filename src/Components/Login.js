import React, { useState } from "react";
import { attemptLogin, createUser } from "../store";
import { useDispatch } from "react-redux";
import Feed from "./Feed";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  const register = (ev) => {
    console.log("register");
    //ev.preventDefault();
    //dispatch(register(credentials));
  };

  return (
    <div>
      <form onSubmit={login}>
        <h2>login</h2>
        <TextField
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <TextField
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <div className="buttons">
          <Button color="secondary" onClick={login}>
            login
          </Button>
          <Button color="secondary" onClick={register}>
            register
          </Button>
        </div>
      </form>
      <Feed />
    </div>
  );
};

export default Login;
