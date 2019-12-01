import React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import BottomButtons from "./BottomButtons";
import { logout } from "../actions/auth";
import { Avatar } from "react-native-paper";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Perfil"
  };
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  logout() {
    this.props.navigation.navigate("Mapa");
    this.props.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={{ uri: this.props.user.background }}
            style={styles.profile}
          >
            <View style={styles.photo}>
              <Avatar.Image
                size={150}
                source={{
                  uri: this.props.user.avatar
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: 25,
                  color: "white"
                }}
              >
                {this.props.user && this.props.user.username
                  ? this.props.user.username
                  : null}
              </Text>
              <Text style={{ color: "white" }}>
                {this.props.denunciasUsuario.length} denúncias realizadas
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.options}>
            <TouchableOpacity onPress={this.navigateToScreen("MeusLocais")}>
              <Text>Meus Locais</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={this.navigateToScreen("MinhasDenuncias")}
            >
              <Text>Minhas Denúncias</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <TouchableOpacity onPress={this.navigateToScreen("FotoPerfil")}>
              <Text>Mudar Foto de Perfil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <TouchableOpacity onPress={this.navigateToScreen("PlanoFundo")}>
              <Text>Mudar Plano de Fundo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <TouchableOpacity onPress={this.logout.bind(this)}>
              <Text style={{}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    padding: 40,
    backgroundColor: "#EAE9E9",
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    borderBottomWidth: 0.5,
    padding: 20,
    justifyContent: "center"
  },
  photo: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: "black"
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token,
  denunciasUsuario: state.denunciasUsuario.denunciasUsuario
});

export default connect(mapStateToProps, { logout })(ProfileScreen);
