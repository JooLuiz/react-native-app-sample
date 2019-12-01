import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar } from "react-native-paper";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  renderSide() {
    if (this.props.isAuthenticated) {
      return (
        <View style={{ flex: 1 }}>
          <View
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
                  uri:
                    "https://scontent.fgru15-1.fna.fbcdn.net/v/t1.0-9/s960x960/77233593_2609047322513024_9044118965416099840_o.jpg?_nc_cat=102&_nc_oc=AQkMYH87w5PFrhO81gsFHb1aFowAJ58U4IF0gZdFwTblGpu4cMFxNqz7WihC73mck8Y&_nc_ht=scontent.fgru15-1.fna&oh=fe3ed9d57bd1bef277e9e08c8a179e94&oe=5E6474CF"
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
          </View>
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

export default connect(mapStateToProps, null)(SideMenu);
