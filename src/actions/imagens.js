import axios from "axios";
import {
  SEND_IMAGENS_TO_SERVER,
  ADD_IMAGE,
  ADD_PATH,
  REMOVE_IMAGEM
} from "./types";
import { tokenConfig } from "./auth";

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
