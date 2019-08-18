import {
  GET_USER_LOCATION,
  SET_USER_LOCATION,
  SET_INITIAL_REGION
} from "../actions/types";

const initialState = {
  initialRegion: {},
  initialPosition: {},
  finalPosition: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LOCATION:
    case SET_USER_LOCATION:
      return {
        initialPosition: action.payload.initialPosition
      };
    case SET_INITIAL_REGION:
      return {
        initialRegion: action.payload.initialRegion
      };
    default:
      return state;
  }
}
