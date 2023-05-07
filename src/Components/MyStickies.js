import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const MyStickies = ()=> {
  const { auth, myStickies } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>My Stickies:</h1>
      <h2>{auth.username}</h2>
      <ul>
      {
        myStickies.map(sticky => {
          return (
            <li key={sticky.id}>
              {sticky.title}
              <br/>
              <hr/>
              {sticky.text}
            </li>
          )
        })
      }
      </ul>
    </div>
  );
};

export default MyStickies;