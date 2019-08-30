import React from "react";
import { connect } from "react-redux";
import { setUserCurrentLocation, getUserCurrentLocation } from "../actions/map";
import { setTravellingPoints } from "../actions/directions";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import BottomButtons from "./BottomButtons";
import Geocoder from "react-native-geocoding";
import axios from "axios";
import Polyline from "@mapbox/polyline";
// import MapViewDirections from "react-native-maps-directions";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    text: null,
    place: null,
    start: null,
    coords: null
  };

  getPlaceFromName() {
    if (this.state.text == "" || this.state.text == null) {
      this.state.place = null;
    } else {
      this.getPlace(this.state.text);
    }
  }

  getPlace(place) {
    if (!this.state.start) {
      Geocoder.from(place).then(json => {
        var location = json.results[0].geometry.location;
        this.state.place = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0065,
          longitudeDelta: 0.0065
        };
        this._map.animateToCoordinate(this.state.place, 2000);
      });
    }
  }

  getPlaceFromCoordinate(coords) {
    this.getPlace(coords);
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

  showDirectionsButton() {
    return this.state.place && !this.state.start ? (
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

  async startDirections() {
    Geolocation.getCurrentPosition(position => {
      this.state.start = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0065,
        longitudeDelta: 0.0065
      };
      let origin = position.coords.latitude + "," + position.coords.longitude;
      let destination =
        this.state.place.latitude + "," + this.state.place.longitude;
      axios
        .get(
          "https://maps.googleapis.com/maps/api/directions/json?origin=" +
            origin +
            "&destination=" +
            destination +
            "&key=YOUR_API_KEY"
        )
        .then(res => {
          let encodedPoints = res.data.routes[0].overview_polyline.points;
          encodedPoints = encodedPoints.replace(/\\\\/g, "\\");
          let points = Polyline.decode(
            res.data.routes[0].overview_polyline.points
          );
          console.error(encodedPoints);
          let coords = points.map(point => {
            return {
              latitude: point[0],
              longitude: point[1]
            };
          });
          console.error(coords);
          this.setState({ coords: coords });
        });
    });
  }

  componentDidMount() {
    Geocoder.init("YOUR_API_KEY");
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
          {this.state.coords ? (
            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="red"
            />
          ) : null}
        </MapView>
        <View style={styles.searchInputView}>
          <TextInput
            style={styles.searchInput}
            placeholder="pesquisar local"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => this.getPlaceFromName()}
          />
        </View>
        <View style={styles.denunciaBottomButtom}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          >
            <Text style={styles.circle} />
          </TouchableOpacity>
        </View>
        {this.showDirectionsButton()}
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

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
  }
});

const mapStateToProps = state => ({
  userCurrentLocation: state.map.userCurrentLocation,
  start: state.directions.start,
  end: state.directions.end
});

export default connect(
  mapStateToProps,
  { setUserCurrentLocation, getUserCurrentLocation, setTravellingPoints }
)(HomeScreen);
