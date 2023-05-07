import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Profile = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{auth.username}'s profile</h2>
    </div>
  );
};

export default Profile;