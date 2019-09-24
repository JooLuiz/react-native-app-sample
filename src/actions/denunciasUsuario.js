import axios from "axios";
import {
  GET_DENUNCIAS_USUARIO,
  ADD_DENUNCIA_USUARIO,
  GET_ALL_DENUNCIAS
} from "./types";
import { tokenConfig } from "./auth";

//GET Denuncia Usuario
export const getDenunciasUsuario = () => (dispatch, getState) => {
  tokenConfig(getState).then(function(config) {
    axios
      .get("/usuario_denuncia/", config)
      .then(res => {
        dispatch({
          type: GET_DENUNCIAS_USUARIO,
          payload: res.data
        });
      })
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  });
};

//GET ALL Denuncia Usuario
export const getAllDenuncias = () => (dispatch, getState) => {
  axios
    .get("/all_denuncias/")
    .then(res => {
      dispatch({
        type: GET_ALL_DENUNCIAS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD Denuncia Usuario

export const addDenunciaUsuario = DenunciaUsuario => (dispatch, getState) => {
  tokenConfig(getState).then(function(config) {
    axios
      .post("/usuario_denuncia/", DenunciaUsuario, config)
      .then(res => {
        dispatch({
          type: ADD_DENUNCIA_USUARIO,
          payload: res.data
        });
      })
      .catch(err => dispatch(console.warn(err)));
  });
};
