import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import Feed from './Feed';

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
      <h2>login</h2>
      <form onSubmit={ login }>
        <input
          placeholder='username'
          value = { credentials.username }
          name = 'username'
          onChange = { onChange }
          />
        <input
          placeholder='password'
          name = 'password'
          value={ credentials.password }
          onChange = { onChange }
        />
        <button>login</button>
      </form>
      < Feed />
    </div>
  );
};

export default Login;
