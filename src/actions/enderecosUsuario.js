import axios from "axios";
import {
  GET_ENDERECO_USUARIO,
  SET_CURRENT_ENDERECO_USUARIO,
  ADD_ENDERECO_USUARIO,
  LOADING,
  LOADED,
  SET_PLACE_KIND,
  NOTIFY
} from "./types";
import { tokenConfig } from "./auth";

//GET  de Denuncia
export const getEnderecoUsuario = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
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
        .catch(/*err => TODO*/);
    })
    .catch(/*err => TODO*/)
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

//ADD Endereco Usuario

export const addEnderecoUsuario = EnderecoUsuario => (dispatch, getState) => {
  dispatch({ type: LOADING });
  tokenConfig(getState).then(function(config) {
    axios
      .post("/endereco_usuario/", EnderecoUsuario, config)
      .then(res => {
        dispatch({
          type: ADD_ENDERECO_USUARIO,
          payload: res.data
        });
        dispatch({
          type: NOTIFY,
          payload: {
            message: "Local cadastrado com sucesso",
            type: "success"
          }
        });
      })
      .catch(err =>
        dispatch({
          type: NOTIFY,
          payload: {
            message:
              "Ops, Algo errado aconteceu e não foi possível concluir a ação",
            type: "error"
          }
        })
      )
      .finally(t => {
        dispatch({ type: LOADED });
      });
  });
};

export const setCurrentEnderecoUsuario = denuncia => dispatch => {
  dispatch({
    type: SET_CURRENT_ENDERECO_USUARIO,
    payload: denuncia
  });
};

export const setPlaceKind = kind => dispatch => {
  dispatch({
    type: SET_PLACE_KIND,
    payload: kind
  });
};
