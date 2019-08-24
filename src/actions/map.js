import { GET_USER_CURRENT_LOCATION, SET_USER_CURRENT_LOCATION } from "./types";
import Geolocation from "@react-native-community/geolocation";

export const getUserCurrentLocation = () => dispatch => {
  var userCurrentLocation = Geolocation.getCurrentPosition(
    position => {
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    },
    error => console.log(error),
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
  );

  dispatch({
    payload: {
      userCurrentLocation: userCurrentLocation
    },
    type: GET_USER_CURRENT_LOCATION
  });
};

export const setUserCurrentLocation = coordinates => dispatch => {
  dispatch({
    payload: {
      userCurrentLocation: coordinates
    },
    type: SET_USER_CURRENT_LOCATION
  });
};
