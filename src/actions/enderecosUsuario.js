import axios from "axios";
import {
  GET_ENDERECO_USUARIO,
  SET_CURRENT_ENDERECO_USUARIO,
  ADD_ENDERECO_USUARIO
} from "./types";
import { tokenConfig } from "./auth";

//GET  de Denuncia
export const getEnderecoUsuario = () => (dispatch, getState) => {
  tokenConfig(getState)
    .then(function(config) {
      axios
        .get("/endereco_usuario/", config)
        .then(res => {
          dispatch({
            type: GET_ENDERECO_USUARIO,
            payload: res.data
          });
        })
        .catch(err => console.warn(err));
    })
    .catch(err => console.warn(err));
};

//ADD Endereco Usuario

export const addEnderecoUsuario = EnderecoUsuario => (dispatch, getState) => {
  tokenConfig(getState).then(function(config) {
    axios
      .post("/endereco_usuario/", EnderecoUsuario, config)
      .then(res => {
        dispatch({
          type: ADD_ENDERECO_USUARIO,
          payload: res.data
        });
      })
      .catch(err => dispatch(console.warn(err)));
  });
};

export const setCurrentEnderecoUsuario = denuncia => dispatch => {
  dispatch({
    type: SET_CURRENT_ENDERECO_USUARIO,
    payload: denuncia
  });
};
