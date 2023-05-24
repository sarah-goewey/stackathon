import React, { useState } from "react";
import { attemptLogin, register } from "../store";
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

  const _register = (ev) => {
    ev.preventDefault();
    dispatch(register(credentials));
  };

  const bypassLogin = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin({ username: "moe", password: "123" }));
  };

  return (
    <div>
      <form>
        <h2>login or register</h2>
        <TextField
          autoComplete="username"
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <TextField
          type="password"
          autoComplete="current-password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <div className="buttons">
          <Button color="secondary" onClick={login}>
            login
          </Button>
          <Button color="secondary" onClick={_register}>
            register
          </Button>
          <Button color="warning" onClick={bypassLogin}>
            bypass login for demo
          </Button>
        </div>
      </form>
      <Feed />
    </div>
  );
};

export default Login;
