import { SET_TRAVELING_POINTS } from "./types";

export const setTravellingPoints = (start, end) => dispatch => {
  dispatch({
    payload: {
      start: start,
      end: end
    },
    type: SET_TRAVELING_POINTS
  });
};
