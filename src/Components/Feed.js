import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Feed = ()=> {
  const { auth, allStickies } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <ul className = 'stickyFeed'>
      {
        allStickies.map(sticky => {
          return (
            <Card sx={{ maxWidth: 345 }} key={sticky.id} variant = 'outlined' style={{backgroundColor: sticky.color, fontFamily: sticky.font}}>
              <CardContent>
                {sticky.title}
                <br />
                {sticky.text}
              </CardContent>
            </Card>
          )
        })
      }
    </ul>
  );
};

export default Feed;