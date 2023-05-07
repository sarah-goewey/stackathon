import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Feed from './Feed';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>home</h2>
      <div>
        welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>logout</button>
      </div>
      < Feed />
    </div>
  );
};

export default Home;
