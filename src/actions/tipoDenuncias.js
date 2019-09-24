import axios from "axios";
import { GET_TIPO_DENUNCIA, SET_CURRENT_TIPO_DENUNCIA } from "./types";
import { tokenConfig } from "./auth";

//GET Tipo de Denuncia
export const getTipoDenuncias = () => (dispatch, getState) => {
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
        .catch(err => console.warn(err));
    })
    .catch(error => console.warn(error));
};

export const setCurrentTipoDenuncia = tipodenuncia => dispatch => {
  dispatch({
    type: SET_CURRENT_TIPO_DENUNCIA,
    payload: tipodenuncia
  });
};
