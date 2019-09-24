import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  FlatList
} from "react-native";
import BottomButtons from "./BottomButtons";

const voltar = "<-";
class MyPlacesScreen extends React.Component {
  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>{voltar}</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.props.denunciasUsuario}
          ListEmptyComponent={
            <View style={styles.listItem}>
              <Text>Você ainda não possui nenhum endereço</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableHighlight>
              <View style={styles.listItem}>
                <Text>nome:{item.nome}</Text>
                <Text>
                  <View>Latitude:{item.latitude}</View>
                  <View>Longitude:{item.longitude}</View>
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <View style={styles.denunciaBottomButtom}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("TipoDenuncia");
            }}
          >
            <Text style={styles.circle} />
          </TouchableOpacity>
        </View>
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5
  },
  header: {
    height: Dimensions.get("window").height * 0.04,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5
  },
  backButton: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.2
  },
  denunciaBottomButtom: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    left: Dimensions.get("window").width * 0.12
  },
  circle: {
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "red"
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  enderecosUsuario: state.enderecosUsuario.enderecosUsuario
});

export default connect(
  mapStateToProps,
  null
)(MyPlacesScreen);
