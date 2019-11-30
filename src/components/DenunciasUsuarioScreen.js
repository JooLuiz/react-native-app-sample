import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  Modal
} from "react-native";
import { setPlaceKind } from "../actions/enderecosUsuario";
import { addDenunciaUsuario } from "../actions/denunciasUsuario";
import { getAllDenuncias } from "../actions/denunciasUsuario";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import GoBackButton from "./common/GoBackButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TextInput, HelperText } from "react-native-paper";
import { RNCamera } from "react-native-camera";

const windowWidth = Dimensions.get("window").width;
var IMAGES_PER_ROW = 3;

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
        this.props.addDenunciaUsuario(usuario_denuncia, this.props.imagens);
        this.props.getAllDenuncias();

        this.props.navigation.navigate("Mapa");
      });
  }

  calculatedSize() {
    var size = (windowWidth * 0.877) / IMAGES_PER_ROW;
    return { width: size, height: size, margin: 1 };
  }

  renderImagesInGroupsOf(min, max) {
    return (
      <View
        style={{
          flex: 1,
          position: "relative",
          flexDirection: "row",
          margin: 2
        }}
        key={min}
      >
        {this.props.imagens[min] ? (
          <Image
            key={min}
            style={[this.calculatedSize()]}
            source={{ uri: this.props.imagens[min].uri }}
          />
        ) : null}
        {this.props.imagens[max - 1] ? (
          <Image
            key={max - 1}
            style={[this.calculatedSize()]}
            source={{ uri: this.props.imagens[max - 1].uri }}
          />
        ) : null}
        {this.props.imagens[max] ? (
          <Image
            key={max}
            style={[this.calculatedSize()]}
            source={{ uri: this.props.imagens[max].uri }}
          />
        ) : null}
      </View>
    );
  }

  renderImagesList() {
    if (this.props.paths.length !== 0) {
      var l = this.props.paths.length;
      var isDivisible = l % 3;
      var rows = 0;
      if (isDivisible == 0) {
        rows = l / 3;
      } else {
        rows = (l + (l % 3)) / 3;
      }
      var lista = [];
      for (var i = 0; i < rows; i++) {
        lista.push(i);
      }
      return lista.map(num =>
        this.renderImagesInGroupsOf(num * 3, (num + 1) * 3 - 1)
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.input}>
          <ScrollView>
            <TextInput
              label="Comentário"
              mode="outlined"
              onChangeText={comentario => this.setState({ comentario })}
              value={this.state.comentario}
              style={styles.inputs}
              multiline={true}
              numberOfLines={4}
            ></TextInput>
            <TextInput
              label="Endereço"
              mode="outlined"
              disabled={this.props.kind !== "custom"}
              onChangeText={endereco => this.setState({ endereco })}
              value={this.state.endereco}
              style={styles.inputs}
            ></TextInput>
            <Button
              title="Camera"
              onPress={() => this.props.navigation.navigate("Camera")}
            ></Button>
            {this.renderImagesList()}
          </ScrollView>
        </View>
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
  currentDenuncia: state.denuncias.currentDenuncia,
  paths: state.imagens.paths,
  imagens: state.imagens.imagens
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
  },
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

export default connect(mapStateToProps, {
  getAllDenuncias,
  addDenunciaUsuario,
  setPlaceKind
})(DenunciasUsuarioScreen);
