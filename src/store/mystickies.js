import axios from 'axios';

const myStickies = (state = [], action)=> {
  if(action.type === 'SET_MY_STICKIES') {
    return action.stickies
  }
  return state
}

export const fetchMyStickies = () => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('api/stickies/user', {
      headers: {
        authorization: token
      }
    })
    dispatch({type: 'SET_MY_STICKIES', stickies: response.data})
  }
}

export default myStickies