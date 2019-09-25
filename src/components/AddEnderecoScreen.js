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
import { addEnderecoUsuario } from "../actions/enderecosUsuario";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";

class AddEnderecoScreen extends React.Component {
  state = {
    place: "current",
    text: null,
    nome: null,
    lat: null,
    lng: null
  };

  setEnderecoPlace(place) {
    this.state.place = place;
  }

  getPlace() {
    let address = this.state.text.replace(/ /g, "+");

    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address +
          "&region=br&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
      )
      .then(json => {
        var location = json.data.results[0].geometry.location;
        this.setState({ lat: location.lat, lng: location.lng });
        this.registerAndGo(location.lat, location.lng);
      });
  }

  registerEndereco() {
    if (this.state.place == "custom") this.getPlace();
    else this.getCurrentPosition();
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      this.registerAndGo(position.coords.latitude, position.coords.longitude);
    });
  }

  registerAndGo(lat, lng) {
    const endereco_usuario = {
      latitude: this.state.lat == null ? lat : this.state.lat,
      longitude: this.state.lng == null ? lng : this.state.lng,
      nome: this.state.nome == null ? "TO-DO" : this.state.nome
    };
    this.props.addEnderecoUsuario(endereco_usuario);

    this.props.navigation.navigate("Mapa");
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.travellingModeView}>
          <TextInput
            style={styles.searchInput}
            placeholder="nome"
            onChangeText={nome => this.setState({ nome })}
            value={this.state.nome}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.setEnderecoPlace("current")}
          >
            <Text>Utilizar Local Atual</Text>
            <View style={styles.checkBoxcircle}>
              {this.state.place === "current" && (
                <View style={styles.checkedCircle} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.setEnderecoPlace("custom")}
          >
            <Text>Pesquisar local</Text>
            <View style={styles.checkBoxcircle}>
              {this.state.place === "custom" ? (
                <View style={styles.checkedCircle} />
              ) : null}
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
          <TouchableOpacity onPress={() => this.registerEndereco()}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
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
  { addEnderecoUsuario }
)(AddEnderecoScreen);
