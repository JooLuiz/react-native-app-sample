import React from "react";
import { connect } from "react-redux";
import { setUserLocation } from "../actions/map";
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

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    mapRegion: null,
    text: null
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
    this.setState({
      mapRegion: region
    });
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
        />
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: Dimensions.get("window").height * 0.1
          }}
        >
          <TextInput
            style={{
              height: Dimensions.get("window").height * 0.07,
              width: Dimensions.get("window").width * 0.9,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 7
            }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={styles.denunciaBottomButtom}>
          <Text style={styles.circle} />
        </View>
        <View style={styles.navigationBottomButtons}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Text>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => this.props.navigation.navigate("Mapa")}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Perfil</Text>
          </TouchableOpacity>
        </View>
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
  denunciaBottomButtom: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    left: Dimensions.get("window").width * 0.12
  },
  navigationBottomButtons: {
    flex: 1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0
  },
  navigationButton: {
    flex: 1,
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width / 3,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    flex: 1
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...StyleSheet.absoluteFillObject
  },
  circle: {
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "red"
  }
});

export default connect(
  null,
  { setUserLocation }
)(HomeScreen);
