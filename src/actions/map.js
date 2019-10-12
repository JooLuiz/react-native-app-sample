import {
  SET_USER_CURRENT_LOCATION,
  SET_SEARCHED_PLACE,
  SET_ORIGIN,
  SET_DESTINATION,
  LOADING,
  LOADED,
  CANCEL_MAP_OPERATIONS,
  SET_DIRECTIONS
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

export const startDirections = points => dispatch => {
  dispatch({ type: LOADING });
  googleDirections(points)
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

export const googleDirections = async (points, mode = "driving") => {
  console.warn("google directions");
  console.warn(points);
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
        console.warn("dei certo");
        console.warn(res);
        let encodedPoints = res.data.routes[0].overview_polyline.points;
        encodedPoints = encodedPoints.replace(/\\\\/g, "\\");
        let points = Polyline.decode(
          res.data.routes[0].overview_polyline.points
        );

        let coords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1]
          };
        });

        let legs = res.data.routes[0].legs[0];
        let directionsDetail = {
          distance: legs.distance,
          duration: legs.duration,
          start_address: legs.start_address,
          end_address: legs.end_address
        };

        let directionsMessagePoints = {
          steps: legs.steps
        };

        let finalResult = {
          coords,
          directionsDetail,
          directionsMessagePoints
        };
        resolve(finalResult);
      })
      .catch(e => {
        console.warn("dei errado");
        console.warn(e);
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
