import React, { useEffect, useRef } from 'react';
import Home from './Home';
import Login from './Login';
import MyStickies from './MyStickies';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchStickies } from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const prevAuth = useRef({ })

  useEffect(()=> {
    dispatch(loginWithToken())
  }, []);

  useEffect(()=> {
    if(!prevAuth.current.id && auth.id) {
      console.log('logged in')
      dispatch(fetchStickies())
    }
    if(!prevAuth.current.id && !auth.id) {
      console.log('logged out')
    }
  }, [auth])

  useEffect(()=> {
    prevAuth.current = auth
  })

  return (
    <div>
      <h1>Spiffy Stickies</h1>
      {
        !auth.id && <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
              <Link to ='/mystickies'>My Stickies</Link>
              <Link to = '/profile'>My Profile</Link>
            </nav>
            <Routes>
              <Route path = '/' element = {<Home />} />
              <Route path = '/login' element = {<Login />} />
              <Route path = '/mystickies' element = {<MyStickies />} />
              <Route path = '/profile' element = {<Profile />} />
            </Routes>
          </div>
        )
      }
    </div>
  );
};

export default App;
