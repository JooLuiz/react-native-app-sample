import { SET_TRAVELING_POINTS } from "../actions/types";

const initialState = {
  start: null,
  end: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TRAVELING_POINTS:
      return {
        start: action.payload.start,
        end: action.payload.end
      };
    default:
      return state;
  }
}
