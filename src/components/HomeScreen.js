import React from "react";
import { connect } from "react-redux";
import { setUserCurrentLocation, getUserCurrentLocation } from "../actions/map";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import BottomButtons from "./BottomButtons";
import Geocoder from "react-native-geocoding";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    text: null,
    place: null,
    places: null
  };

  getPlaceFromName() {
    if (this.state.text == "" || this.state.text == null) {
      this.state.place = null;
    } else {
      this.getPlace(this.state.text);
    }
  }

  getPlace(place) {
    Geocoder.from(place).then(json => {
      var location = json.results[0].geometry.location;
      this.state.place = { latitude: location.lat, longitude: location.lng };
    });
  }

  getPlaceFromCoordinate() {}

  showMarker() {
    return this.state.place ? (
      <MapView.Marker
        coordinate={this.state.place}
        title={this.state.text}
        description={this.state.text}
      />
    ) : null;
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
        >
          {this.showMarker()}
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
          <Text style={styles.circle} />
        </View>
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
  circle: {
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "red"
  }
});

const mapStateToProps = state => ({
  userCurrentLocation: state.map.userCurrentLocation
});

export default connect(
  mapStateToProps,
  { setUserCurrentLocation, getUserCurrentLocation }
)(HomeScreen);
