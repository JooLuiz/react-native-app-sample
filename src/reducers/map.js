import { SET_USER_CURRENT_LOCATION } from "../actions/types";

const initialState = {
  userCurrentLocation: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CURRENT_LOCATION:
      return {
        userCurrentLocation: action.payload.userCurrentLocation
      };
    default:
      return state;
  }
}
