import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { setPlaceKind } from "../actions/enderecosUsuario";
import { addDenunciaUsuario } from "../actions/denunciasUsuario";
import { getAllDenuncias } from "../actions/denunciasUsuario";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import GoBackButton from "./common/GoBackButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

class DenunciasUsuarioScreen extends React.Component {
  state = {
    endereco: null,
    comentario: null
  };

  register() {
    this.props.kind == "current" ? this.getCurrentPosition() : this.getPlace();
  }

  getPlace() {
    let address = this.state.endereco.replace(/ /g, "+");
    this.registerAndGo(address);
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      var address = position.coords.latitude + "," + position.coords.longitude;
      this.registerAndGo(address);
    });
  }

  registerAndGo(endereco) {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          endereco +
          "&region=br&key=AIzaSyAvNMSYo05_RNMaBdKEw3UcPl2REfxUpas"
      )
      .then(json => {
        var location = json.data.results[0].geometry.location;

        const usuario_denuncia = {
          latitude: location.lat,
          longitude: location.lng,
          denuncia: this.props.currentDenuncia.id,
          comentario: this.state.comentario
        };
        this.props.addDenunciaUsuario(usuario_denuncia);
        this.props.getAllDenuncias();

        this.props.navigation.navigate("Mapa");
      });
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View>
        <GoBackButton
          navigation={this.props.navigation}
          title="Cadastro de Denúncia"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: Dimensions.get("window").width,
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.setPlaceKind("current")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Dimensions.get("window").width * 0.03,
              height: Dimensions.get("window").height * 0.07,
              backgroundColor: this.props.kind == "current" ? "grey" : "white",
              width: "50%",
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ top: Dimensions.get("window").height * 0.02 }}>
              Utilizar Local Atual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setPlaceKind("custom")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: Dimensions.get("window").width * 0.03,
              height: Dimensions.get("window").height * 0.07,
              backgroundColor: this.props.kind == "current" ? "white" : "grey",
              width: "50%",
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ top: Dimensions.get("window").height * 0.02 }}>
              Pesquisar Local
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Comentário"
          onChangeText={comentario => this.setState({ comentario })}
          value={this.state.Comentario}
          style={{
            alignSelf: "center",
            top: Dimensions.get("window").height * 0.05,
            height: Dimensions.get("window").height * 0.27,
            width: Dimensions.get("window").width * 0.9,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 7
          }}
        ></TextInput>
        {this.props.kind == "custom" ? (
          <TextInput
            placeholder="Endereço"
            onChangeText={endereco => this.setState({ endereco })}
            value={this.state.endereco}
            style={{
              alignSelf: "center",
              top: Dimensions.get("window").height * 0.1,
              height: Dimensions.get("window").height * 0.07,
              width: Dimensions.get("window").width * 0.9,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 7
            }}
          ></TextInput>
        ) : null}
        <View style={styles.addPlaceBottomButtom}>
          <TouchableOpacity onPress={() => this.register()}>
            <View style={styles.circle}>
              <FontAwesomeIcon icon="check" color={"white"} size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  kind: state.enderecosUsuario.kind,
  currentDenuncia: state.denuncias.currentDenuncia
});

const styles = StyleSheet.create({
  addPlaceBottomButtom: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.75,
    right: Dimensions.get("window").width * 0.12
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "green"
  }
});

export default connect(
  mapStateToProps,
  { getAllDenuncias, addDenunciaUsuario, setPlaceKind }
)(DenunciasUsuarioScreen);
