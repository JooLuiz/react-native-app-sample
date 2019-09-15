import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const login = payload => dispatch => {
  console.warn(payload);
  axios
    .post(`/auth/login`, payload)
    .then(response => {
      console.warn(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
        token: response.token
      });
    })
    .catch(error => {
      console.warn(error);
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const register = payload => dispatch => {
  console.warn(payload);
  axios
    .post(`/auth/register`, payload)
    .then(response => {
      console.warn(response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
        token: response.token
      });
    })
    .catch(error => {
      console.warn(error);
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
