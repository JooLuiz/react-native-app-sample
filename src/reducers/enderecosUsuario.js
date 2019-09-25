import {
  GET_ENDERECO_USUARIO,
  SET_CURRENT_ENDERECO_USUARIO,
  ADD_ENDERECO_USUARIO
} from "../actions/types";

const initialState = {
  enderecosUsuario: [],
  currentEnderecoUsuario: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ENDERECO_USUARIO:
      return {
        ...state,
        enderecosUsuario: action.payload
      };
    case SET_CURRENT_ENDERECO_USUARIO:
      return {
        ...state,
        currentEnderecoUsuario: action.payload
      };
    case ADD_ENDERECO_USUARIO:
      return {
        ...state,
        enderecosUsuario: [...state.enderecosUsuario, action.payload]
      };
    default:
      return state;
  }
}
