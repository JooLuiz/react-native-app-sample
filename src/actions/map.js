import {
  SET_USER_CURRENT_LOCATION,
  SET_SEARCHED_PLACE,
  SET_ORIGIN,
  SET_DESTINATION,
  LOADING,
  LOADED,
  CANCEL_MAP_OPERATIONS
} from "./types";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";

export const setUserCurrentLocation = coordinates => dispatch => {
  dispatch({
    type: SET_USER_CURRENT_LOCATION,
    payload: {
      userCurrentLocation: coordinates
    }
  });
};

export const getPlace = (place, type = "address") => dispatch => {
  dispatch({ type: LOADING });
  let address;
  if (type === "address") {
    address = place.replace(/ /g, "+");
  } else if (type === "coordinates") {
    address = place.latitude + "," + place.longitude;
  }
  googleGeocoding(address)
    .then(function(res) {
      dispatch({
        type: SET_SEARCHED_PLACE,
        payload: {
          searchedPlace: res
        }
      });
    })
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const setOrigin = place => dispatch => {
  dispatch({ type: LOADING });
  if (place) {
    let address;
    if (type === "address") {
      address = place.replace(/ /g, "+");
    } else if (type === "coordinates") {
      address = place.latitude + "," + place.longitude;
    }
    googleGeocoding(address)
      .then(function(res) {
        dispatch({
          type: SET_ORIGIN,
          payload: {
            origin: res
          }
        });
      })
      .finally(t => {
        dispatch({ type: LOADED });
      });
  } else {
    Geolocation.getCurrentPosition(position => {
      let address = position.coords.latitude + "," + position.coords.longitude;
      googleGeocoding(address).then(function(res) {
        dispatch({
          type: SET_ORIGIN,
          payload: {
            origin: res
          }
        });
      });
    }).finally(t => {
      dispatch({ type: LOADED });
    });
  }
};

export const googleGeocoding = async address => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address +
          "&region=br&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
      )
      .then(json => {
        var location = json.data.results[0].geometry.location;
        var placeLongName =
          json.data.results[0].address_components[0].long_name +
          " " +
          json.data.results[0].address_components[1].long_name;
        var placeShortName =
          json.data.results[0].address_components[0].short_name +
          " " +
          json.data.results[0].address_components[1].short_name;
        var transformedLocation = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0065,
          longitudeDelta: 0.0065
        };

        var finalPlace = {
          longName: placeLongName,
          shortName: placeShortName,
          coordinates: transformedLocation
        };
        resolve(finalPlace);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const cancelMapOperations = () => dispatch => {
  dispatch({
    type: CANCEL_MAP_OPERATIONS
  });
};

export const setDestination = place => dispatch => {
  dispatch({
    type: SET_DESTINATION,
    payload: {
      destination: place
    }
  });
};
