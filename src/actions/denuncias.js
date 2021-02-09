import axios from "axios";
import {
  GET_DENUNCIA,
  SET_CURRENT_DENUNCIA,
  LOADING,
  LOADED,
  NOTIFY
} from "./types";
import { tokenConfig } from "./auth";

//GET  de Denuncia
export const getDenuncias = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    tokenConfig(getState).then(function(config) {
      axios
        .get("/denuncias/", config)
        .then(res => {
          resolve(res.data);
          dispatch({
            type: GET_DENUNCIA,
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
        });
    });
  })
    .catch(() => dispatch({ type: LOADED }))
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const setCurrentDenuncia = denuncia => dispatch => {
  dispatch({
    type: SET_CURRENT_DENUNCIA,
    payload: denuncia
  });
};
