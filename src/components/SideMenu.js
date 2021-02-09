import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { getDenuncias } from "../actions/denuncias";
import {
  getDenunciasUsuario,
  getAllDenuncias
} from "../actions/denunciasUsuario";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar } from "react-native-paper";
import { getEnderecoUsuario } from "../actions/enderecosUsuario";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    if (route == "MinhasDenuncias") {
      this.props.getDenuncias().then(() => {
        this.props.getDenunciasUsuario().then(() => {
          this.props.navigation.dispatch(navigateAction);
        });
      });
    } else if ((route = "DenunciasRecentes")) {
      this.props.getAllDenuncias().then(() => {
        this.props.navigation.dispatch(navigateAction);
      });
    } else if (route == "MeusLocais") {
      this.props.getEnderecoUsuario().then(() => {
        this.props.navigation.dispatch(navigateAction);
      });
    } else {
      this.props.navigation.dispatch(navigateAction);
    }
  };

  renderSide() {
    if (this.props.isAuthenticated) {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={{ uri: this.props.user.background }}
            style={{
              flexDirection: "row",
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 20,
              backgroundColor: "black"
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 100,
                borderColor: "white"
              }}
            >
              <Avatar.Image
                source={{
                  uri: this.props.user.avatar
                }}
              />
            </View>
            <View style={{ left: 20, justifyContent: "center" }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {this.props.user.username}
              </Text>
              <Text style={{ color: "white", fontStyle: "italic" }}>
                {this.props.denunciasUsuario.length} denúncias
              </Text>
            </View>
          </ImageBackground>
          <ScrollView>
            <View>
              <View>
                <TouchableOpacity onPress={this.navigateToScreen("MeusLocais")}>
                  <Text style={styles.screens}> Meus Locais </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={this.navigateToScreen("MinhasDenuncias")}
                >
                  <Text style={styles.screens}> Minhas Denúncias </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={this.navigateToScreen("DenunciasRecentes")}
                >
                  <Text style={styles.screens}> Denúncias Recentes </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "space-around",
              padding: 50,
              backgroundColor: "black"
            }}
          >
            <Text style={{ color: "white" }}>Bem-Vindo ao Rota Segura</Text>
          </View>
          <ScrollView>
            <View>
              <View>
                <TouchableOpacity onPress={this.navigateToScreen("Login")}>
                  <Text style={styles.screens}> Login </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={this.navigateToScreen("Register")}>
                  <Text style={styles.screens}> Cadastro </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSide()}
        <View style={styles.footer}>
          <View style={styles.version}>
            <Text style={{ color: "white", fontStyle: "italic" }}>
              {" "}
              versão: v0.0.1 Alpha{" "}
            </Text>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={this.navigateToScreen("Login")}>
              <FontAwesomeIcon icon="cog" color={"white"} size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363636",
    color: "white"
  },
  screens: {
    padding: 20,
    color: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#4F4F4F"
  },
  footer: {
    flexDirection: "row",
    width: "100%"
  },
  icon: {
    flex: 1,
    backgroundColor: "black",
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  version: {
    flex: 5,
    backgroundColor: "#1C1C1C",
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  denunciasUsuario: state.denunciasUsuario.denunciasUsuario
});

export default connect(mapStateToProps, {
  getDenuncias,
  getDenunciasUsuario,
  getAllDenuncias,
  getEnderecoUsuario
})(SideMenu);
