import {
  SET_USER_CURRENT_LOCATION,
  SET_SEARCHED_PLACE,
  SET_ORIGIN,
  SET_DESTINATION,
  CANCEL_MAP_OPERATIONS,
  SET_DIRECTIONS
} from "../actions/types";

const initialState = {
  userCurrentLocation: null,
  isTravelling: false,
  searchedPlace: null,
  origin: null,
  destination: null,
  directionsCoords: null,
  directionsMessagePoints: null,
  directionsDetails: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CURRENT_LOCATION:
      return {
        userCurrentLocation: action.payload.userCurrentLocation
      };
    case SET_SEARCHED_PLACE:
      return {
        ...state,
        searchedPlace: action.payload.searchedPlace
      };
    case SET_ORIGIN:
      return {
        ...state,
        origin: action.payload.origin
      };
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload.destination
      };
    case CANCEL_MAP_OPERATIONS:
      return {
        ...state,
        destination: null,
        origin: null,
        searchedPlace: null,
        directionsCoords: null,
        directionsDetail: null,
        directionsMessagePoints: null
      };
    case SET_DIRECTIONS:
      return {
        ...state,
        directionsCoords: action.payload.coords,
        directionsDetail: action.payload.directionsDetail,
        directionsMessagePoints: action.payload.directionsMessagePoints
      };
    default:
      return state;
  }
}
