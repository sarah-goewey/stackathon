import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import Feed from './Feed';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = ()=> {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };
  return (
    <div>
      <form onSubmit={ login }>
        <h2>login</h2>
        <TextField
          placeholder='username'
          value = { credentials.username }
          name = 'username'
          onChange = { onChange }
          />
        <TextField
          placeholder='password'
          name = 'password'
          value={ credentials.password }
          onChange = { onChange }
        />
        <Button color = 'secondary' onClick={login}>login</Button>
      </form>
      < Feed />
    </div>
  );
};

export default Login;
