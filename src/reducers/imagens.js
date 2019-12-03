import {
  SEND_IMAGENS_TO_SERVER,
  ADD_IMAGE,
  ADD_PATH,
  REMOVE_IMAGEM
} from "../actions/types";

const initialState = {
  imagens: [],
  paths: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_IMAGENS_TO_SERVER:
      return {
        ...state,
        imagens: []
      };
    case REMOVE_IMAGEM:
      return {
        ...state,
        imagens: state.imagens.filter(i => i.uri != action.payload),
        paths: state.paths.filter(i => i != action.payload)
      };
    case ADD_IMAGE:
      return {
        ...state,
        imagens: [...state.imagens, action.payload]
      };
    case ADD_PATH:
      return {
        ...state,
        paths: [...state.paths, action.payload]
      };
    default:
      return state;
  }
}
