import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}