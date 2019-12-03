import axios from "axios";
import {
  GET_DENUNCIAS_USUARIO,
  ADD_DENUNCIA_USUARIO,
  GET_ALL_DENUNCIAS,
  LOADING,
  LOADED,
  NOTIFY,
  REMOVE_IMAGEM,
  SEND_IMAGENS_TO_SERVER
} from "./types";
import { tokenConfig } from "./auth";

//GET Denuncia Usuario
export const getDenunciasUsuario = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    tokenConfig(getState)
      .then(function(config) {
        axios
          .get("/usuario_denuncia/", config)
          .then(res => {
            resolve(res.data);
            dispatch({
              type: GET_DENUNCIAS_USUARIO,
              payload: res.data
            });
          })
          .catch(err => {
            reject("erro");
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
      .catch(() => {
        reject("erro");
        dispatch({ type: LOADED });
      });
  });
};

//GET ALL Denuncia Usuario
export const getAllDenuncias = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    axios
      .get("/all_denuncias/")
      .then(res => {
        resolve(res.data);
        dispatch({
          type: GET_ALL_DENUNCIAS,
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
      .finally(t => {
        dispatch({ type: LOADED });
      });
  });
};

//ADD Denuncia Usuario
export const addDenunciaUsuario = (DenunciaUsuario, imagens) => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOADING });
    tokenConfig(getState)
      .then(config => {
        axios.post("/usuario_denuncia/", DenunciaUsuario, config).then(res => {
          dispatch({
            type: ADD_DENUNCIA_USUARIO,
            payload: res.data
          });
          imagens.forEach((imagem, index) => {
            const imagesData = new FormData();

            imagesData.append("imagem", {
              uri: imagem.uri,
              type: "image/jpeg",
              name: `${res.data.id}_${index + 1}.jpg`
            });

            imagesData.append("usuario_denuncia", res.data.id);
            axios
              .post("/usuario_denuncia_imagens/", imagesData, config)
              .then(res => {
                dispatch({
                  type: REMOVE_IMAGEM,
                  payload: imagem
                });
              });
          });
          resolve(res.data);
          dispatch({
            type: NOTIFY,
            payload: {
              message: "Denuncia Cadastrada Com Sucesso",
              type: "success"
            }
          });
        });
      })
      .catch(() => {
        reject("erro");
        dispatch({ type: LOADED });
      })
      .finally(t => {
        dispatch({ type: LOADED });
        dispatch({ type: SEND_IMAGENS_TO_SERVER });
      });
  });
};
