import axios from "axios";
import { GET_DENUNCIA, SET_CURRENT_DENUNCIA } from "./types";
import { tokenConfig } from "./auth";

//GET  de Denuncia
export const getDenuncias = () => (dispatch, getState) => {
  tokenConfig(getState)
    .then(function(config) {
      axios
        .get("/denuncias/", config)
        .then(res => {
          dispatch({
            type: GET_DENUNCIA,
            payload: res.data
          });
        })
        .catch(err => console.warn(err));
    })
    .catch(err => console.warn(err));
};

export const setCurrentDenuncia = denuncia => dispatch => {
  dispatch({
    type: SET_CURRENT_DENUNCIA,
    payload: denuncia
  });
};
