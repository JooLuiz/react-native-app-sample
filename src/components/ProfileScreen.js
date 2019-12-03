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
import { Avatar, List } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
          <List.Item
            title="Meus Locais"
            description="Cadastre os locais que você mais gosta!"
            left={props => (
              <List.Icon
                {...props}
                icon={() => <FontAwesomeIcon icon="map-marker-alt" size={28} />}
              />
            )}
            onPress={this.navigateToScreen("MeusLocais")}
          />
          <List.Item
            title="Minhas Denúncias"
            description="Consulte as denúncias que você já realizou"
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <FontAwesomeIcon icon="exclamation-triangle" size={28} />
                )}
              />
            )}
            onPress={this.navigateToScreen("MinhasDenuncias")}
          />
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
          <List.Item
            titleStyle={{ color: "#E61D1D" }}
            title="Logout"
            descriptionStyle={{ color: "#FA6262" }}
            description="Faça Logout do Rota Segura App"
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <FontAwesomeIcon
                    icon="sign-out-alt"
                    color={"#E61D1D"}
                    size={28}
                  />
                )}
              />
            )}
            onPress={this.logout.bind(this)}
          />
          <BottomButtons navigation={this.props.navigation} />
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
