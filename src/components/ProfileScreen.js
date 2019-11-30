import React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
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
          <View style={styles.profile}>
            <View style={styles.photo}>
              <Avatar.Image
                size={150}
                source={{
                  uri:
                    "https://scontent.fgru15-1.fna.fbcdn.net/v/t1.0-9/s960x960/77233593_2609047322513024_9044118965416099840_o.jpg?_nc_cat=102&_nc_oc=AQkMYH87w5PFrhO81gsFHb1aFowAJ58U4IF0gZdFwTblGpu4cMFxNqz7WihC73mck8Y&_nc_ht=scontent.fgru15-1.fna&oh=fe3ed9d57bd1bef277e9e08c8a179e94&oe=5E6474CF"
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: 25
                }}
              >
                {this.props.user.username}
              </Text>
              <Text>
                {this.props.denunciasUsuario.length} denúncias realizadas
              </Text>
            </View>
          </View>

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
            <TouchableOpacity onPress={this.logout.bind(this)}>
              <Text style={{}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomButtons navigation={this.props.navigation} />
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
