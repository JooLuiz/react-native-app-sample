import axios from "axios";
import { GET_DENUNCIA, SET_CURRENT_DENUNCIA, LOADING, LOADED } from "./types";
import { tokenConfig } from "./auth";

//GET  de Denuncia
export const getDenuncias = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
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
        .catch(/*err => TODO*/);
    })
    .catch(/*err => TODO*/)
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
