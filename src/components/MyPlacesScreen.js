import React from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import EmptyList from "./common/EmptyList";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getEnderecoUsuario } from "../actions/enderecosUsuario";
import { getPlace, setOrigin } from "../actions/map";
import { List } from "react-native-paper";

class MyPlacesScreen extends React.Component {
  static navigationOptions = {
    title: "Meus Locais"
  };

  componentWillMount() {
    this.props.getEnderecoUsuario();
    this.props.navigation.addListener("willFocus", () => {
      if (this.props.isAuthenticated) this.props.getEnderecoUsuario();
    });
  }

  render() {
    return (
      <View styles={styles.container}>
        <FlatList
          data={this.props.enderecosUsuario}
          ListEmptyComponent={
            <EmptyList text="Você ainda não possui nenhum endereço cadastrado" />
          }
          renderItem={({ item }) => (
            <View>
              <List.Item
                title={item.nome}
                description={item.endereco}
                onPress={() => {
                  let coordinates = {
                    latitude: item.latitude,
                    longitude: item.longitude
                  };
                  this.props.getPlace(coordinates, "coordinates");
                  this.props.setOrigin().then(() => {
                    this.props.navigation.navigate("Mapa");
                  });
                }}
                left={() => (
                  <List.Icon
                    icon={() => (
                      <FontAwesomeIcon icon="map-marker-alt" size={30} />
                    )}
                  />
                )}
              />
            </View>
          )}
        />
        <View style={styles.addPlaceBottomButtom}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("AddEnderecoScreen");
            }}
          >
            <View style={styles.circle}>
              <FontAwesomeIcon icon="plus" color={"white"} size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: "#ffffff"
  },
  addPlaceBottomButtom: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.015,
    right: Dimensions.get("window").width * 0.07
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.15,
    borderRadius: 400,
    backgroundColor: "#3B4859"
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  enderecosUsuario: state.enderecosUsuario.enderecosUsuario
});

export default connect(mapStateToProps, {
  getEnderecoUsuario,
  getPlace,
  setOrigin
})(MyPlacesScreen);
