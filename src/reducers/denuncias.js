import { GET_DENUNCIA, SET_CURRENT_DENUNCIA } from "../actions/types";

const initialState = {
  denuncias: [],
  currentDenuncia: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DENUNCIA:
      return {
        ...state,
        denuncias: action.payload
      };
    case SET_CURRENT_DENUNCIA:
      return {
        ...state,
        currentDenuncia: action.payload
      };
    default:
      return state;
  }
}
