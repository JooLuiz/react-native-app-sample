import React from "react";
import { connect } from "react-redux";
import {
  getPlace,
  cancelMapOperations,
  setOrigin,
  startDirections
} from "../actions/map";
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
import { getAllDenuncias } from "../actions/denunciasUsuario";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    region: null,
    text: null,
    mode: "driving",
    coords: null
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
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
    this.setState({ region: region });
  }

  //Direction Functions

  setTravelMode(mode) {
    this.state.mode = mode;
  }

  cancelTravel() {
    Geolocation.getCurrentPosition(position => {
      var origin = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0065,
        longitudeDelta: 0.0065
      };
      this._map.animateToCoordinate(origin, 2000);
      this.props.cancelMapOperations();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchedPlace) {
      if (nextProps.searchedPlace.coordinates) {
        this._map.animateToCoordinate(
          nextProps.searchedPlace.coordinates,
          2000
        );
      }
    }
  }

  getPlaceFromCoordinates(coords) {
    this.props.getPlace(coords, "coordinates");
    this.props.setOrigin();
  }

  getPlaceFromName(name) {
    this.props.getPlace(name, "address");
    this.props.setOrigin();
  }

  //Functions that effect the screen

  showDirectionsButton() {
    return this.props.searchedPlace && !this.props.directionsCoords ? (
      <View style={styles.directionsBottomButtom}>
        <TouchableOpacity
          onPress={() => {
            this.props.startDirections(
              {
                origin: this.props.origin,
                dest: this.props.searchedPlace
              },
              this.state.mode
            );
          }}
        >
          <View style={styles.greyCircle}>
            <FontAwesomeIcon icon="directions" color={"white"} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  showPlaceDetailsButton() {
    return this.props.searchedPlace &&
      this.props.origin &&
      !this.props.directionsCoords ? (
      <View style={styles.placeDetailsButton}>
        <View
          style={{
            height: Dimensions.get("window").width * 0.8,
            width: Dimensions.get("window").width,
            backgroundColor: "white"
          }}
        >
          <Text
            style={{ top: 5, color: "grey", fontSize: 12, alignSelf: "center" }}
          >
            Origem
          </Text>
          <Text
            style={{
              top: 8,
              color: "black",
              fontSize: 16,
              alignSelf: "center"
            }}
          >
            {this.props.origin.longName}
          </Text>
          <View
            style={{
              top: 11,
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.9,
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          />
          <Text
            style={{
              top: 10,
              color: "grey",
              fontSize: 12,
              alignSelf: "center"
            }}
          >
            Pesquisa
          </Text>
          <Text
            style={{
              top: 13,
              color: "black",
              fontSize: 16,
              alignSelf: "center"
            }}
          >
            {this.props.searchedPlace.longName}
          </Text>
          <View
            style={{
              top: 16,
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.9,
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          />
          {this.showTravellingOptions()}
        </View>
      </View>
    ) : null;
  }

  showTravellingOptions() {
    return this.props.searchedPlace && !this.props.directionsCoords ? (
      <View style={styles.travellingModeView}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: this.state.mode === "driving" ? "grey" : "white"
            }
          ]}
          onPress={() => this.setTravelMode("driving")}
        >
          <Text>Dirigindo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: this.state.mode === "transit" ? "grey" : "white"
            }
          ]}
          onPress={() => this.setTravelMode("transit")}
        >
          <Text>Transporte Público</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.state.mode === "bicycling" ? "grey" : "white"
            }
          ]}
          onPress={() => this.setTravelMode("bicycling")}
        >
          <Text>Bibicleta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: this.state.mode === "walking" ? "grey" : "white"
            }
          ]}
          onPress={() => this.setTravelMode("walking")}
        >
          <Text>Andando</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  showDenunciasMarker() {
    var markers = [];
    if (this.props.allDenuncias != null) {
      this.props.allDenuncias.forEach(function(item, index) {
        let denunciacoordinate = {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        };
        markers[index] = (
          <MapView.Marker
            coordinate={denunciacoordinate}
            title={item.denuncia.descricao}
            description={item.comentario}
          >
            <FontAwesomeIcon
              icon={item.denuncia.icone}
              color={"black"}
              size={30}
            />
          </MapView.Marker>
        );
      });
    }
    return markers;
  }

  showMarker() {
    return this.props.searchedPlace ? (
      <MapView.Marker
        coordinate={this.props.searchedPlace.coordinates}
        title={this.props.searchedPlace.longName}
        description={this.props.searchedPlace.shortName}
      />
    ) : null;
  }

  showDirections() {
    return this.props.directionsCoords ? (
      <MapView.Polyline
        coordinates={this.props.directionsCoords}
        strokeWidth={2}
        strokeColor="red"
      />
    ) : null;
  }

  searchInput() {
    return !this.props.searchedPlace && !this.props.directionsCoords ? (
      <View style={styles.searchInputView}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Local"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => this.getPlaceFromName(this.state.text)}
        />
      </View>
    ) : null;
  }

  denunciaButton() {
    return this.props.isAuthenticated ? (
      <View style={styles.denunciaBottomButtom}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("TipoDenuncia");
          }}
        >
          <View style={styles.circle}>
            <FontAwesomeIcon
              icon="exclamation-triangle"
              color={"white"}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  cancel() {
    return this.props.searchedPlace ? (
      <View style={styles.cancelCoordsButton}>
        <TouchableOpacity
          onPress={() => {
            this.cancelTravel();
          }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size={30} />
        </TouchableOpacity>
      </View>
    ) : null;
  }

  //Component Render

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          ref={ref => {
            this._map = ref;
          }}
        >
          {this.showDenunciasMarker()}
          {this.showMarker()}
          {this.showDirections()}
        </MapView>
        {this.cancel()}
        {this.searchInput()}
        {this.denunciaButton()}
        {this.showDirectionsButton()}
        {this.showPlaceDetailsButton()}
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
    bottom: Dimensions.get("window").height * 0.13,
    left: Dimensions.get("window").width * 0.07,
    zIndex: 2
  },
  directionsBottomButtom: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.13,
    right: Dimensions.get("window").width * 0.07,
    zIndex: 2
  },
  placeDetailsButton: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.09
  },
  circle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "#3B4859"
  },
  greyCircle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "black"
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 100,
    backgroundColor: "white",
    width: Dimensions.get("window").width
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "grey",
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
    left: Dimensions.get("window").width * 0.05
  },
  cancelCoordsCircle: {
    height: Dimensions.get("window").width * 0.11,
    width: Dimensions.get("window").width * 0.11,
    borderRadius: 400,
    backgroundColor: "red"
  }
});

const mapStateToProps = state => ({
  isTravelling: state.map.isTravelling,
  searchedPlace: state.map.searchedPlace,
  origin: state.map.origin,
  destination: state.map.destination,
  isAuthenticated: state.auth.isAuthenticated,
  allDenuncias: state.denunciasUsuario.allDenuncias,
  directionsCoords: state.map.directionsCoords,
  directionsDetail: state.map.directionsDetail,
  directionsMessagePoints: state.map.directionsMessagePoints
});

export default connect(
  mapStateToProps,
  { getAllDenuncias, getPlace, cancelMapOperations, setOrigin, startDirections }
)(HomeScreen);
