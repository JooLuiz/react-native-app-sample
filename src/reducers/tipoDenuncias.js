import { GET_TIPO_DENUNCIA, SET_CURRENT_TIPO_DENUNCIA } from "../actions/types";

const initialState = {
  tipoDenuncias: [],
  currentTipoDenuncia: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TIPO_DENUNCIA:
      return {
        ...state,
        tipoDenuncias: action.payload
      };
    case SET_CURRENT_TIPO_DENUNCIA:
      return {
        ...state,
        currentTipoDenuncia: action.payload
      };
    default:
      return state;
  }
}
