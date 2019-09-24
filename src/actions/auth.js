import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS
} from "./types";
import { _retrieveData } from "../reducers/auth";

//CHECK THE TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  tokenConfig(getState)
    .then(function(config) {
      axios
        .get("/auth/user", config)
        .then(res => {
          dispatch({
            type: USER_LOADED,
            payload: res.data
          });
        })
        .catch(error => {
          console.warn(error);
          dispatch({
            type: AUTH_ERROR
          });
        });
    })
    .catch(function(error) {
      console.warn(error);
    });
};

export const login = payload => dispatch => {
  axios
    .post(`/auth/login`, payload)
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
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
  axios
    .post(`/auth/register`, payload)
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      console.warn(error);
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const tokenConfig = async getState => {
  const token = await _retrieveData();

  return new Promise((resolve, reject) => {
    //get Token from state

    //Headers
    const config = { headers: { "Content-type": "application/json" } };

    //if token add to header
    if (token) config.headers["Authorization"] = `Token ${token}`;
    else reject("Error");

    resolve(config);
  });
};
