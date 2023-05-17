import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateAuth } from "../store";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth) {
      setUsername(auth.username);
      setPassword(auth.password);
    }
  }, [auth]);

  const update = (ev) => {
    try {
      ev.preventDefault();
      dispatch(updateAuth({ username, password }));
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <form>
        <h3>edit profile</h3>
        <label>
          change username
          <TextField
            autoComplete="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </label>
        <label>
          change password
          <TextField
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <div className="buttons">
          <Button color="secondary" onClick={update}>
            update
          </Button>
          <Button color="secondary" onClick={() => dispatch(logout())}>
            logout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
