import {
  GET_DENUNCIAS_USUARIO,
  ADD_DENUNCIA_USUARIO,
  GET_ALL_DENUNCIAS
} from "../actions/types";

const initialState = {
  denunciasUsuario: [],
  allDenuncias: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DENUNCIAS_USUARIO:
      return {
        ...state,
        denunciasUsuario: action.payload
      };
    case GET_ALL_DENUNCIAS:
      return {
        ...state,
        allDenuncias: action.payload
      };
    case ADD_DENUNCIA_USUARIO:
      return {
        ...state,
        denunciasUsuario: [...state.denunciasUsuario, action.payload]
      };
    default:
      return state;
  }
}
