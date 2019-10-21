import {
  SET_USER_CURRENT_LOCATION,
  SET_SEARCHED_PLACE,
  SET_ORIGIN,
  LOADING,
  LOADED,
  CANCEL_MAP_OPERATIONS,
  SET_DIRECTIONS,
  SET_TRAVELLING_MODE
} from "./types";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import Polyline from "@mapbox/polyline";

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

export const startDirections = (points, mode) => dispatch => {
  dispatch({ type: LOADING });
  googleDirections(points, mode)
    .then(function(res) {
      dispatch({
        type: SET_DIRECTIONS,
        payload: {
          coords: res.coords,
          directionsDetail: res.directionsDetail,
          directionsMessagePoints: res.directionsMessagePoints
        }
      });
    })
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

export const googleDirections = async (points, mode) => {
  return new Promise((resolve, reject) => {
    let originLatLng =
      points.origin.coordinates.latitude +
      "," +
      points.origin.coordinates.longitude;
    let destLatLng =
      points.dest.coordinates.latitude +
      "," +
      points.dest.coordinates.longitude;
    axios
      .get(
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
          originLatLng +
          "&destination=" +
          destLatLng +
          "&mode=" +
          mode +
          "&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
      )
      .then(res => {
        let encodedPoints = res.data.routes[0].overview_polyline.points;
        encodedPoints = encodedPoints.replace(/\\\\/g, "\\");
        let points = Polyline.decode(encodedPoints);

        let coords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1]
          };
        });

        let legs = res.data.routes[0].legs[0];
        let directionsDetail = {
          distance: legs.distance.text,
          duration: legs.duration.text,
          start_address: legs.start_address,
          end_address: legs.end_address
        };

        let directionsMessagePoints = {
          steps: legs.steps
        };
        directionsMessagePoints.steps.forEach(element => {
          element.html_instructions = element.html_instructions
            .replace(/\<b\>/g, "")
            .replace(/\<\/b\>/g, "");
        });
        let finalResult = {
          coords,
          directionsDetail,
          directionsMessagePoints
        };
        resolve(finalResult);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const setTravellingMode = mode => dispatch => {
  dispatch({ type: LOADING });
  dispatch({
    type: SET_TRAVELLING_MODE,
    payload: { travellingMode: mode }
  });
  dispatch({ type: LOADED });
};

export const cancelMapOperations = () => dispatch => {
  dispatch({ type: LOADING });
  dispatch({
    type: CANCEL_MAP_OPERATIONS
  });
  dispatch({ type: LOADED });
};
