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
  dispatch({ type: LOADING });
  tokenConfig(getState)
    .then(function(config) {
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
          dispatch({ type: LOADED });
        });
    })
    .catch(() => dispatch({ type: LOADED }));
};

//GET ALL Denuncia Usuario
export const getAllDenuncias = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
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
    )
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

//ADD Denuncia Usuario
export const addDenunciaUsuario = (DenunciaUsuario, imagens) => (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING });
  tokenConfig(getState)
    .then(config => {
      axios.post("/usuario_denuncia/", DenunciaUsuario, config).then(res => {
        console.warn(res.data);
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
        dispatch({
          type: NOTIFY,
          payload: {
            message: "Denuncia Cadastrada Com Sucesso",
            type: "success"
          }
        });
      });
    })
    .catch(() => dispatch({ type: LOADED }))
    .finally(t => {
      dispatch({ type: LOADED });
      dispatch({ type: SEND_IMAGENS_TO_SERVER });
    });
};
