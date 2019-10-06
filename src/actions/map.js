import { SET_USER_CURRENT_LOCATION } from "./types";

export const setUserCurrentLocation = coordinates => dispatch => {
  dispatch({
    type: SET_USER_CURRENT_LOCATION,
    payload: {
      userCurrentLocation: coordinates
    }
  });
};
