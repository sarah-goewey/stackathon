import axios from 'axios';

const stickies = (state = [], action)=> {
  if(action.type === 'SET_STICKIES') {
    return action.stickies
  }
  return state
}

export const fetchStickies = () => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('api/stickies', {
      headers: {
        authorization: token
      }
    })
    dispatch({type: 'SET_STICKIES', stickies: response.data})
  }
}

export default stickies