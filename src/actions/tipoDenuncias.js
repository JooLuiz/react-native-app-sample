import axios from "axios";
import {
  GET_TIPO_DENUNCIA,
  SET_CURRENT_TIPO_DENUNCIA,
  LOADED,
  LOADING
} from "./types";
import { tokenConfig } from "./auth";

//GET Tipo de Denuncia
export const getTipoDenuncias = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  tokenConfig(getState)
    .then(function(config) {
      axios
        .get("/tipodenuncia/", config)
        .then(res => {
          dispatch({
            type: GET_TIPO_DENUNCIA,
            payload: res.data
          });
        })
        .catch(/*err => TODO*/);
    })
    .catch(/*err => TODO*/)
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const setCurrentTipoDenuncia = tipodenuncia => dispatch => {
  dispatch({
    type: SET_CURRENT_TIPO_DENUNCIA,
    payload: tipodenuncia
  });
};
