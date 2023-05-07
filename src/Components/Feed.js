import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Feed = ()=> {
  const { auth, allStickies } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <ul>
      {
        allStickies.map(sticky => {
          return (
            <li key={sticky.id}>{sticky.title}</li>
          )
        })
      }
    </ul>
  );
};

export default Feed;