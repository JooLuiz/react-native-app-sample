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
  Dimensions,
  TouchableOpacity,
  Share
} from "react-native";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import BottomButtons from "./BottomButtons";
import { getAllDenuncias } from "../actions/denunciasUsuario";
import { addEnderecoUsuario } from "../actions/enderecosUsuario";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import SearchedPlaceDetail from "./SearchedPlaceDetail";
import TravelDetails from "./TravelDetails";
import { Searchbar, FAB, Portal } from "react-native-paper";
import { getDenuncias } from "../actions/denuncias";
import { getEnderecoUsuario } from "../actions/enderecosUsuario";
import {
  getTipoDenuncias,
  setCurrentTipoDenuncia
} from "../actions/tipoDenuncias";
import {} from "react-native-paper";
import { loading, loaded } from "../actions/loader";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    region: null,
    text: null,
    open: false
  };

  componentDidMount() {
    this.props.loading();
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
      error => console.log(error.message)
    );
    this.props.loaded();
    this.props.navigation.addListener("willFocus", () => {
      this.props.loading();
      this.props.getAllDenuncias();
      if (this.props.isAuthenticated) {
        this.props.getEnderecoUsuario();
        this.props.getDenuncias();
        this.props.getTipoDenuncias();
      }
      this.props.loaded();
    });
  }

  onRegionChange(region) {
    this.setState({ region: region });
  }

  //Direction Functions

  cancelTravel() {
    this._map.animateToRegion(this.props.origin.coordinates, 2000);
    this.props.cancelMapOperations();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchedPlace) {
      if (nextProps.searchedPlace.coordinates) {
        if (
          this.props.searchedPlace != null &&
          this.props.searchedPlace.coordinates != null &&
          nextProps.searchedPlace.coordinates !=
            this.props.searchedPlace.coordinates
        ) {
          this._map.animateToRegion(nextProps.searchedPlace.coordinates, 2000);
        } else if (this.props.searchedPlace == null) {
          this._map.animateToRegion(nextProps.searchedPlace.coordinates, 2000);
        }
      }
    }

    if (nextProps.directionsCoords) {
      if (this.props.directionsCoords != nextProps.directionsCoords) {
        this._map.animateToRegion(this.props.origin.coordinates, 2000);
      }
    }
  }

  getPlaceFromCoordinates(coords) {
    this.props.loading();
    this.props.getPlace(coords, "coordinates");
    this.props.setOrigin();
    this.props.loaded();
  }

  getPlaceFromName(name) {
    this.props.loading();
    this.props.getPlace(name, "address");
    this.props.setOrigin();
    this.props.loaded();
  }

  //Functions that effect the screen

  showDirectionsButton() {
    return this.props.searchedPlace && !this.props.directionsCoords ? (
      <View style={[styles.defaultBottomButton, styles.directionsBottomButtom]}>
        <TouchableOpacity
          onPress={() => {
            this.props.startDirections(
              {
                origin: this.props.origin,
                dest: this.props.searchedPlace
              },
              this.props.travellingMode
            );
          }}
        >
          <View style={[{ backgroundColor: "black" }, styles.circle]}>
            <FontAwesomeIcon icon="directions" color={"white"} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  showPlaceDetails() {
    return this.props.searchedPlace &&
      this.props.origin &&
      !this.props.directionsCoords ? (
      <SearchedPlaceDetail />
    ) : null;
  }

  showTravellingMessages() {
    return this.props.searchedPlace &&
      this.props.origin &&
      this.props.directionsCoords ? (
      <TravelDetails />
    ) : null;
  }

  showDenunciasMarker() {
    var markers = [];
    if (this.props.allDenuncias != null) {
      var today = new Date();
      var days = 86400000; //number of milliseconds in a day
      var fiveDaysAgo = new Date(today - 5 * days);
      this.props.allDenuncias.forEach((item, index) => {
        var itemDate = new Date(
          item.data_hora.split("T")[0].split("-")[0],
          item.data_hora.split("T")[0].split("-")[1],
          item.data_hora.split("T")[0].split("-")[2],
          item.data_hora.split("T")[1].split(":")[0],
          item.data_hora.split("T")[1].split(":")[1]
        );

        let denunciacoordinate = {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        };
        if (itemDate > fiveDaysAgo) {
          markers[index] = (
            <MapView.Marker
              key={index}
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
        }
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
        <Searchbar
          style={styles.searchInput}
          icon={() => <FontAwesomeIcon icon="search" size={20} color="gray" />}
          clearIcon={() => <FontAwesomeIcon icon="backspace" size={20} color="gray" />}
          placeholder="Pesquisar Local"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => {
            this.getPlaceFromName(this.state.text);
            this.setState({ text: null });
          }}
        />
      </View>
    ) : null;
  }

  setTipoDenunciaAndGo(tipoDenuncia) {
    this.props.setCurrentTipoDenuncia(tipoDenuncia);
    this.props.navigation.navigate("Denuncia");
  }

  denunciaButton() {
    return this.props.isAuthenticated ? (
      <View>
        <Portal>
          <FAB.Group
            ref={ref => {
              this._fab = ref;
            }}
            style={{
              paddingBottom: Dimensions.get("window").height * 0.1,
              paddingRight: Dimensions.get("window").width * 0.02
            }}
            fabStyle={styles.red}
            open={this.state.open}
            visible={true}
            icon={() =>
              !this.state.open ? (
                <FontAwesomeIcon
                  icon="exclamation-triangle"
                  color={"black"}
                  size={25}
                />
              ) : (
                <FontAwesomeIcon
                  icon={"times-circle"}
                  color={"black"}
                  size={25}
                />
              )
            }
            actions={
              this.props.tipoDenuncias
                ? this.props.tipoDenuncias.map(item => {
                    return {
                      label: item.descricao,
                      accessibilityLabel: item.descricao,
                      icon: () => (
                        <FontAwesomeIcon
                          icon={item.icone}
                          color={"black"}
                          size={25}
                        />
                      ),
                      onPress: () => this.setTipoDenunciaAndGo.call(this, item)
                    };
                  })
                : []
            }
            onStateChange={({ open }) => this.setState({ open })}
          />
        </Portal>
      </View>
    ) : null;
  }

  onShare = async () => {
    try {
      await Share.share(
        {
          message:
            "Estou utilizando o RotaSegura App.\nVeja Minha Viagem.\nOrigem:" +
            this.props.origin.longName +
            ".\nDestino:" +
            this.props.searchedPlace.longName
        },
        {
          dialogTitle: "RotaSegura App - Compartilhe sua Viagem"
        }
      );
    } catch (error) {
      /*err => TODO*/
    }
  };

  sharePlaceButton() {
    return this.props.searchedPlace && this.props.origin ? (
      <View style={[styles.defaultBottomButton, styles.sharePlaceBottomButtom]}>
        <TouchableOpacity
          onPress={() => {
            this.onShare();
          }}
        >
          <View style={[{ backgroundColor: "#2F68B3" }, styles.circle]}>
            <FontAwesomeIcon icon="share-alt" color={"white"} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  salvarEndereco() {
    const endereco_usuario = {
      latitude: this.props.searchedPlace.coordinates.latitude,
      longitude: this.props.searchedPlace.coordinates.longitude,
      nome: this.props.searchedPlace.longName
    };
    this.props.addEnderecoUsuario(endereco_usuario);
  }

  savePlaceButton() {
    return this.props.searchedPlace &&
      this.props.origin &&
      this.props.isAuthenticated ? (
      <View style={[styles.defaultBottomButton, styles.savePlaceBottomButtom]}>
        <TouchableOpacity
          onPress={() => {
            this.salvarEndereco();
          }}
        >
          <View style={[{ backgroundColor: "#DAE524" }, styles.circle]}>
            <FontAwesomeIcon icon="save" color={"white"} size={25} />
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
          followsUserLocation={this.props.directionsCoords ? true : false}
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
        {this.sharePlaceButton()}
        {this.savePlaceButton()}
        {this.showDirectionsButton()}
        {this.showPlaceDetails()}
        {this.showTravellingMessages()}
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

//StyleSheet Styles

const styles = StyleSheet.create({
  red: {
    backgroundColor: "#b50000"
  },
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
    width: Dimensions.get("window").width * 0.9
  },
  defaultBottomButton: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.125,
    zIndex: 2
  },
  denunciaBottomButtom: {
    right: Dimensions.get("window").width * 0.07
  },
  sharePlaceBottomButtom: {
    left: Dimensions.get("window").width * 0.3
  },
  savePlaceBottomButtom: {
    right: Dimensions.get("window").width * 0.3
  },
  directionsBottomButtom: {
    left: Dimensions.get("window").width * 0.07
  },
  circle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.15,
    borderRadius: 400
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
  isAuthenticated: state.auth.isAuthenticated,
  allDenuncias: state.denunciasUsuario.allDenuncias,
  directionsCoords: state.map.directionsCoords,
  directionsDetail: state.map.directionsDetail,
  directionsMessagePoints: state.map.directionsMessagePoints,
  travellingMode: state.map.travellingMode,
  tipoDenuncias: state.tipoDenuncias.tipoDenuncias
});

export default connect(mapStateToProps, {
  getAllDenuncias,
  getPlace,
  cancelMapOperations,
  setOrigin,
  startDirections,
  addEnderecoUsuario,
  getEnderecoUsuario,
  getDenuncias,
  getTipoDenuncias,
  setCurrentTipoDenuncia,
  loading,
  loaded
})(HomeScreen);
