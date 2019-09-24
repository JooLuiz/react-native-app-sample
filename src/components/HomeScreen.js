import React from "react";
import { connect } from "react-redux";
import { setUserCurrentLocation } from "../actions/map";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import BottomButtons from "./BottomButtons";
import axios from "axios";
import Polyline from "@mapbox/polyline";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    text: null,
    place: null,
    origin: null,
    destination: null,
    mode: "driving",
    coords: null
  };

  componentDidMount() {
    this.watchID = Geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0065,
          longitudeDelta: 0.0065
        };
        this.onRegionChange(region);
      },
      error => console.log(error)
    );
  }

  onRegionChange(region) {
    this.props.setUserCurrentLocation(region);
  }

  //Direction Functions

  setTravelMode(mode) {
    this.state.mode = mode;
  }

  async startDirections() {
    let originLatLng =
      this.state.origin.latitude + "," + this.state.origin.longitude;
    let destinationLatLng =
      this.state.destination.latitude + "," + this.state.destination.longitude;
    axios
      .get(
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
          originLatLng +
          "&destination=" +
          destinationLatLng +
          "&mode=" +
          this.state.mode +
          "&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
      )
      .then(res => {
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
        this.setState({ coords: coords });
      });
  }
  cancelTravel() {
    Geolocation.getCurrentPosition(position => {
      var origin = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0065,
        longitudeDelta: 0.0065
      };
      this._map.animateToCoordinate(origin, 3000);
      this.state.place = null;
      this.state.origin = null;
      this.state.destination = null;
      this.state.coords = null;
    });
  }

  //Geocoding Functions

  getPlaceFromName() {
    if (this.state.text == "" || this.state.text == null) {
      this.state.place = null;
    } else {
      this.getPlace(this.state.text, "address");
    }
  }

  getPlaceFromCoordinate(coords) {
    this.getPlace(coords, "coordinates");
  }

  getPlace(place, type = "address") {
    if (!this.state.coords) {
      let address;
      if (type === "address") {
        address = place.replace(/ /g, "+");
      } else if (type === "coordinates") {
        address = place.latitude + "," + place.longitude;
      }
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            address +
            "&region=br&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
        )
        .then(json => {
          var location = json.data.results[0].geometry.location;
          this.state.place = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0065,
            longitudeDelta: 0.0065
          };
          this.state.destination = this.state.place;
          this._map.animateToCoordinate(this.state.place, 2000);
          Geolocation.getCurrentPosition(position => {
            var origin = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0065,
              longitudeDelta: 0.0065
            };
            this.state.origin = origin;
          });
        });
    }
  }

  //Functions that effect the screen

  showDirectionsButton() {
    return this.state.place &&
      this.state.origin &&
      this.state.destination &&
      !this.state.coords ? (
      <View style={styles.directionsBottomButtom}>
        <TouchableOpacity
          onPress={() => {
            this.startDirections();
          }}
        >
          <Text style={styles.greyCircle} />
        </TouchableOpacity>
      </View>
    ) : null;
  }

  showTravellingOptions() {
    return this.state.place &&
      this.state.origin &&
      this.state.destination &&
      !this.state.coords ? (
      <View style={styles.travellingModeView}>
        <View style={styles.buttonContainer}>
          <Text>Dirigindo</Text>
          <TouchableOpacity
            style={styles.checkBoxcircle}
            onPress={() => this.setTravelMode("driving")}
          >
            {this.state.mode === "driving" && (
              <View style={styles.checkedCircle} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Text>Transporte Público</Text>
          <TouchableOpacity
            style={styles.checkBoxcircle}
            onPress={() => this.setTravelMode("transit")}
          >
            {this.state.mode === "transit" && (
              <View style={styles.checkedCircle} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Text>Bibicleta</Text>
          <TouchableOpacity
            style={styles.checkBoxcircle}
            onPress={() => this.setTravelMode("bicycling")}
          >
            {this.state.mode === "bicycling" && (
              <View style={styles.checkedCircle} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Text>Andando</Text>
          <TouchableOpacity
            style={styles.checkBoxcircle}
            onPress={() => this.setTravelMode("walking")}
          >
            {this.state.mode === "walking" && (
              <View style={styles.checkedCircle} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }

  showMarker() {
    return this.state.place ? (
      <MapView.Marker
        coordinate={this.state.place}
        title={this.state.text}
        description={this.state.text}
      />
    ) : null;
  }

  showDirections() {
    return this.state.coords ? (
      <MapView.Polyline
        coordinates={this.state.coords}
        strokeWidth={2}
        strokeColor="red"
      />
    ) : null;
  }

  searchInput() {
    return !this.state.coords ? (
      <View style={styles.searchInputView}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Local"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => this.getPlaceFromName()}
        />
      </View>
    ) : null;
  }

  denunciaButton() {
    return this.props.isAuthenticated ? (
      <View style={styles.denunciaBottomButtom}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        >
          <Text style={styles.circle} />
        </TouchableOpacity>
      </View>
    ) : null;
  }

  cancelCoords() {
    <View style={styles.cancelCoordsButton}>
      <TouchableOpacity
        onPress={() => {
          this.cancelTravel();
        }}
      >
        <Text style={styles.circle} />
      </TouchableOpacity>
    </View>;
  }

  //Component Render

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.props.userCurrentLocation}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          ref={ref => {
            this._map = ref;
          }}
        >
          {this.showMarker()}
          {this.showDirections()}
        </MapView>
        {this.state.coords ? (
          <View style={styles.cancelCoordsButton}>
            <TouchableOpacity
              onPress={() => {
                this.cancelTravel();
              }}
            >
              <Text style={styles.cancelCoordsCircle} />
            </TouchableOpacity>
          </View>
        ) : null}
        {this.searchInput()}
        {this.showTravellingOptions()}
        {this.denunciaButton()}
        {this.showDirectionsButton()}
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

//StyleSheet Styles

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: Dimensions.get("window").width * 0.17,
    ...StyleSheet.absoluteFillObject
  },
  searchInputView: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get("window").height * 0.1
  },
  searchInput: {
    flex: 1,
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width * 0.9,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 7
  },
  denunciaBottomButtom: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    left: Dimensions.get("window").width * 0.12
  },
  directionsBottomButtom: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    right: Dimensions.get("window").width * 0.12
  },
  circle: {
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "red"
  },
  greyCircle: {
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "grey"
  },
  flatListStyle: {
    backgroundColor: "white",
    borderBottomStartRadius: 7
  },
  flatListItemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  travellingModeView: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get("window").height * 0.16999,
    backgroundColor: "white",
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.9
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Dimensions.get("window").width * 0.03
  },
  checkBoxcircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ACACAC",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#794F9B"
  },
  cancelCoordsButton: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get("window").height * 0.025,
    left: Dimensions.get("window").width * 0.07
  },
  cancelCoordsCircle: {
    height: Dimensions.get("window").width * 0.11,
    width: Dimensions.get("window").width * 0.11,
    borderRadius: 400,
    backgroundColor: "red"
  }
});

const mapStateToProps = state => ({
  userCurrentLocation: state.map.userCurrentLocation,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { setUserCurrentLocation }
)(HomeScreen);
