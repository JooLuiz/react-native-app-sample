import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import BottomButtons from "./BottomButtons";
import { addDenunciaUsuario } from "../actions/denunciasUsuario";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";

class DenunciasUsuarioScreen extends React.Component {
  state = {
    place: "current",
    text: null,
    comentario: null,
    lat: null,
    lng: null
  };

  componentWillMount() {
    this.getCurrentPosition();
  }

  getPlace() {
    let address;
    if (type === "address") address = this.state.text.replace(/ /g, "+");

    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address +
          "&region=br&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
      )
      .then(json => {
        var location = json.data.results[0].geometry.location;
        this.state.lat = location.lat;
        this.state.lng = location.lng;
      });
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition(position => {
      this.state.lat = position.coords.latitude;
      this.state.lng = position.coords.longitude;
    });
  }

  registerDenuncia() {
    if (this.state.place == "custom") this.getPlace();
    else this.getCurrentPosition();

    if (this.state.lat == null || this.state.lng == null)
      this.getCurrentPosition();

    const denuncia_usuario = {
      latitude: this.state.lat,
      longitude: this.state.lng,
      denuncia: this.props.currentDenuncia.id,
      comentario: this.state.comentario == null ? "" : this.state.comentario
    };
    this.props.addDenunciaUsuario(denuncia_usuario);

    this.props.navigation.navigate("Mapa");
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.travellingModeView}>
          <TouchableOpacity
            style={styles.checkBoxcircle}
            onPress={() => this.setDenunciaPlace("current")}
          >
            <View style={styles.buttonContainer}>
              <Text>Utilizar Local Atual</Text>
              {this.state.place === "current" && (
                <View style={styles.checkedCircle} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkBoxcircle}
            onPress={() => this.setDenunciaPlace("custom")}
          >
            <View style={styles.buttonContainer}>
              <Text>Utilizar Local Atual</Text>
              {this.state.place === "custom" && (
                <View style={styles.checkedCircle} />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar local"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Comentário"
            onChangeText={comentario => this.setState({ comentario })}
            value={this.state.comentario}
          />
          <TouchableOpacity onPress={() => this.registerDenuncia()}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentDenuncia: state.denuncias.currentDenuncia
});

const styles = StyleSheet.create({
  listItem: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  travellingModeView: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get("window").height * 0.16999,
    backgroundColor: "white",
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.9
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Dimensions.get("window").width * 0.03
  },
  searchInput: {
    flex: 1,
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width * 0.9,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 7
  }
});

export default connect(
  mapStateToProps,
  { addDenunciaUsuario }
)(DenunciasUsuarioScreen);
