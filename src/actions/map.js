import { SET_USER_CURRENT_LOCATION } from "./types";

export const setUserCurrentLocation = coordinates => dispatch => {
  dispatch({
    payload: {
      userCurrentLocation: coordinates
    },
    type: SET_USER_CURRENT_LOCATION
  });
};
