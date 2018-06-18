import axios from 'axios';
import { FETCH_USER } from './types';

// export const fetchUser = () => { Ref_1
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

//Ref_1
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user'); //returns a promise

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
