import {
  GET_USER_LOCATION,
  SET_USER_LOCATION,
  SET_INITIAL_REGION
} from "./types";
import Geolocation from "@react-native-community/geolocation";

export const getUserLocation = () => dispatch => {
  var initialPosition = Geolocation.getCurrentPosition(
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
      initialPosition: initialPosition
    },
    type: GET_USER_LOCATION
  });
};

export const setUserLocation = (latitude, longitude) => dispatch => {
  dispatch({
    payload: {
      initialPosition: { latitude: latitude, longitude: longitude }
    },
    type: SET_USER_LOCATION
  });
};

export const setInitialRegion = (latitude, longitude) => dispatch => {
  dispatch({
    payload: {
      initialRegion: { latitude: latitude, longitude: longitude }
    },
    type: SET_INITIAL_REGION
  });
};
