import { CHANGE_VISIBILITY, NOTIFY } from "../actions/types";

const initialState = {
  visibility: false,
  message: null,
  type: "success"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return {
        ...state,
        visibility: action.payload.visibility
      };
    case NOTIFY:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        visibility: true
      };
    default:
      return state;
  }
}
