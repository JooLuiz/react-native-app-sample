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
  return new Promise((resolve, reject) => {
    //user loading
    dispatch({ type: LOADING });
    dispatch({ type: USER_LOADING });

    tokenConfig(getState)
      .then(function(config) {
        axios
          .get("/auth/user", config)
          .then(res => {
            resolve(res.data);
            dispatch({
              type: USER_LOADED,
              payload: res.data
            });
          })
          .catch(() => {
            reject("Erro");
            dispatch({
              type: AUTH_ERROR
            });
          });
      })
      .catch(() => {
        reject("Erro");
        dispatch({ type: LOADED });
      })
      .finally(t => {
        dispatch({ type: LOADED });
      });
  });
};

export const login = payload => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    axios
      .post(`/auth/login`, payload)
      .then(response => {
        console.warn(response.data);
        resolve(response.data);
        dispatch({
          type: NOTIFY,
          payload: {
            message:
              "Olá " +
              response.data.user.username +
              ", é um prazer te ver por aqui!",
            type: "success"
          }
        });
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
            if (err.response.status >= 500) {
              dispatch({
                type: NOTIFY,
                payload: {
                  message: "Não foi possível conectar com o servidor.",
                  type: "error"
                }
              });
            }
          })
          .finally(() => {
            axios
              .get("/endereco_usuario/", config)
              .then(res => {
                dispatch({
                  type: GET_ENDERECO_USUARIO,
                  payload: res.data
                });
              })
              .catch(err => {
                if (err.response.status >= 500) {
                  dispatch({
                    type: NOTIFY,
                    payload: {
                      message: "Não foi possível conectar com o servidor.",
                      type: "error"
                    }
                  });
                }
              })
              .finally(() => {
                axios
                  .get("/denuncias/", config)
                  .then(res => {
                    dispatch({
                      type: GET_DENUNCIA,
                      payload: res.data
                    });
                  })
                  .catch(err => {
                    if (err.response.status >= 500) {
                      dispatch({
                        type: NOTIFY,
                        payload: {
                          message: "Não foi possível conectar com o servidor.",
                          type: "error"
                        }
                      });
                    }
                  });
              });
          });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        reject("Error");
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
        } else if (error.response.status >= 500) {
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
  });
};

export const register = payload => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    axios
      .post(`/auth/register`, payload)
      .then(response => {
        resolve(response.data);
        dispatch({
          type: NOTIFY,
          payload: {
            message:
              "Olá " + response.usuario + ", é um prazer te ver por aqui!",
            type: "success"
          }
        });
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data
        });
      })
      .catch((res) => {
        reject("Error");
        dispatch({
          type: REGISTER_FAIL
        });
      })
      .finally(() => {
        dispatch({ type: LOADED });
      });
  });
};

export const logout = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    tokenConfig(getState)
      .then(function(config) {
        axios
          .post(`/auth/logout/`, null, config)
          .then(res => {
            resolve(res.data);
            dispatch({
              type: LOGOUT_SUCCESS,
              payload: res.data
            });
          })
          .catch(err => {
            reject("Erro");
            if (err.response.status >= 500) {
              dispatch({
                type: NOTIFY,
                payload: {
                  message: "Não foi possível conectar com o servidor.",
                  type: "error"
                }
              });
            }
          })
          .finally(() => {
            dispatch({ type: LOADED });
          });
      })
      .catch(err => {
        reject("Erro");
        if (err.response.status >= 500) {
          dispatch({
            type: NOTIFY,
            payload: {
              message: "Não foi possível conectar com o servidor.",
              type: "error"
            }
          });
        }
      })
      .finally(() => {
        dispatch({ type: LOADED });
      });
  });
};

export const editUser = (user, imagem, type) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    //user loading
    dispatch({ type: LOADING });
    dispatch({ type: USER_LOADING });

    tokenConfig(getState)
      .then(function(config) {
        const userData = new FormData();

        userData.append("avatar", {
          uri: imagem && type == "avatar" ? imagem.uri : user.avatar,
          type: "image/jpeg",
          name: `${user.cpf}_avatar.jpg`
        });
        userData.append("background", {
          uri: imagem && type == "background" ? imagem.uri : user.background,
          type: "image/jpeg",
          name: `${user.cpf}_background.jpg`
        });

        userData.append("username", user.username);
        userData.append("email", user.email);
        userData.append("password", user.password);
        userData.append("cpf", user.cpf);

        axios
          .put("/auth/user/edit/", userData, config)
          .then(res => {
            resolve(res.data);
            dispatch({
              type: NOTIFY,
              payload: {
                message: "Usuário Alterado com Sucesso",
                type: "success"
              }
            });
            dispatch({
              type: USER_LOADED,
              payload: res.data
            });
          })
          .catch(() => {
            reject("Erro");
            dispatch({
              type: NOTIFY,
              payload: {
                message: "Não foi possível conectar com o servidor.",
                type: "error"
              }
            });
          });
      })
      .catch(() => {
        reject("Erro");
        dispatch({
          type: NOTIFY,
          payload: {
            message: "Não foi possível conectar com o servidor.",
            type: "error"
          }
        });
        dispatch({ type: LOADED });
      })
      .finally(t => {
        dispatch({ type: LOADED });
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
