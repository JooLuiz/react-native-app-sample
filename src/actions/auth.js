import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOADING,
  LOADED,
  LOGOUT_SUCCESS,
  NOTIFY,
  GET_DENUNCIAS_USUARIO
} from "./types";
import { _retrieveData } from "../reducers/auth";

//CHECK THE TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: LOADING });
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
          dispatch({
            type: AUTH_ERROR
          });
        });
    })
    .catch(function(error) {
      /*TODO*/
    })
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const login = payload => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(`/auth/login`, payload)
    .then(response => {
      const config = { headers: { "Content-type": "application/json" } };
      if (response.data.token)
        config.headers["Authorization"] = `Token ${response.data.token}`;
      axios
        .get("/usuario_denuncia/", config)
        .then(res => {
          dispatch({
            type: GET_DENUNCIAS_USUARIO,
            payload: res.data
          });
        })
        .catch(err => {
          //****TODO****
        });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      var usuarioErrorMessage = "";
      var senhaErrorMessage = "";
      var nonFieldErrorMessage = "";
      if (error.response.data.username) {
        usuarioErrorMessage += "Usuários: " + error.response.data.username;
      }
      if (error.response.data.password) {
        senhaErrorMessage += "Senha: " + error.response.data.password;
      }
      if (error.response.data.non_field_errors) {
        nonFieldErrorMessage += error.response.data.non_field_errors;
      }

      dispatch({
        type: LOGIN_FAIL
      });
      if (error.response.status == 400) {
        if (usuarioErrorMessage != "") {
          dispatch({
            type: NOTIFY,
            payload: {
              message: usuarioErrorMessage,
              type: "error"
            }
          });
        }
        if (senhaErrorMessage != "") {
          dispatch({
            type: NOTIFY,
            payload: {
              message: senhaErrorMessage,
              type: "error"
            }
          });
        }
        if (nonFieldErrorMessage != "") {
          dispatch({
            type: NOTIFY,
            payload: {
              message: nonFieldErrorMessage,
              type: "error"
            }
          });
        }
      } else if (error.response.status == 500 || error.response.status == 502) {
        dispatch({
          type: NOTIFY,
          payload: {
            message: "Não foi possível conectar com o servidor.",
            type: "error"
          }
        });
      }
    })
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const register = payload => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(`/auth/register`, payload)
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
      dispatch({
        type: REGISTER_FAIL
      });
    })
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const logout = () => (dispatch, getState) => {
  tokenConfig(getState)
    .then(function(config) {
      axios
        .post(`/auth/logout/`, null, config)
        .then(res => {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
          });
        })
        .catch(/*error => TODO*/);
    })
    .catch(/*error => TODO*/);
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
