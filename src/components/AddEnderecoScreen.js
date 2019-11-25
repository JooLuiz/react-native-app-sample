import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { addEnderecoUsuario, setPlaceKind } from "../actions/enderecosUsuario";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import GoBackButton from "./common/GoBackButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TextInput, HelperText } from "react-native-paper";

class AddEnderecoScreen extends React.Component {
  state = {
    nome: null,
    endereco: null
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
        var placeLongName =
          json.data.results[0].address_components[0].long_name +
          " " +
          json.data.results[0].address_components[1].long_name;

        const endereco_usuario = {
          latitude: location.lat,
          longitude: location.lng,
          nome: this.state.nome,
          endereco: placeLongName
        };
        this.props.addEnderecoUsuario(endereco_usuario);

        this.props.navigation.goBack();
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoBackButton
          navigation={this.props.navigation}
          title="Adição de um Local"
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
        <View style={styles.input}>
          <ScrollView>
            <TextInput
              label="Nome"
              mode="outlined"
              onChangeText={nome => this.setState({ nome })}
              value={this.state.nome}
              style={styles.inputs}
            ></TextInput>
            <TextInput
              label="Endereco"
              mode="outlined"
              disabled={this.props.kind !== "custom"}
              onChangeText={endereco => this.setState({ endereco })}
              value={this.state.endereco}
              style={styles.inputs}
            ></TextInput>
          </ScrollView>
        </View>
        <View style={styles.addPlaceBottomButtom}>
          <TouchableOpacity onPress={() => this.register()}>
            <View style={styles.circle}>
              <FontAwesomeIcon icon="plus" color={"white"} size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  kind: state.enderecosUsuario.kind
});

const styles = StyleSheet.create({
  addPlaceBottomButtom: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.85,
    right: Dimensions.get("window").width * 0.07
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.15,
    borderRadius: 400,
    backgroundColor: "green"
  },
  input: {
    width: "90%",
    marginBottom: 50,
    alignSelf: "center",
    marginTop: Dimensions.get("window").height * 0.05
  },
  inputs: {
    marginBottom: 15
  }
});

export default connect(mapStateToProps, { addEnderecoUsuario, setPlaceKind })(
  AddEnderecoScreen
);
