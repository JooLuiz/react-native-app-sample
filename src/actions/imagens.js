import axios from "axios";
import { ADD_IMAGE, ADD_PATH, REMOVE_IMAGEM } from "./types";

//ADD Denuncia Usuario
export const addImagem = imagem => dispatch => {
  dispatch({
    type: ADD_IMAGE,
    payload: imagem
  });
};

export const addPaths = path => dispatch => {
  dispatch({
    type: ADD_PATH,
    payload: path
  });
};

export const removeImage = image => dispatch => {
  dispatch({
    type: REMOVE_IMAGEM,
    payload: image
  });
};
