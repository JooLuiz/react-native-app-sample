import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import BottomButtons from "./BottomButtons";
import EmptyList from "./common/EmptyList";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getEnderecoUsuario } from "../actions/enderecosUsuario";
import GoBackButton from "./common/GoBackButton";
import { getPlace, setOrigin } from "../actions/map";

class MyPlacesScreen extends React.Component {
  componentWillMount() {
    this.props.getEnderecoUsuario();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GoBackButton navigation={this.props.navigation} />
        <FlatList
          data={this.props.enderecosUsuario}
          ListEmptyComponent={
            <EmptyList text="Você ainda não possui nenhum endereço cadastrado" />
          }
          renderItem={({ item }) => (
            <TouchableHighlight
              style={{ backgroundColor: "white" }}
              onPress={() => {
                let coordinates = {
                  latitude: item.latitude,
                  longitude: item.longitude
                };
                this.props.getPlace(coordinates, "coordinates");
                this.props.setOrigin();
                this.props.navigation.navigate("Mapa");
              }}
            >
              <View>
                <View style={styles.listItens}>
                  <FontAwesomeIcon icon="map-marker-alt" size={40} />
                  <View style={styles.itemName}>
                    <Text style={styles.nameText}>{item.nome}</Text>
                  </View>
                </View>
                <View style={styles.division} />
              </View>
            </TouchableHighlight>
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
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemName: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    left: Dimensions.get("window").width * 0.03
  },
  listItens: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    left: Dimensions.get("window").height * 0.025
  },
  addPlaceBottomButtom: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    right: Dimensions.get("window").width * 0.12
  },
  nameText: {
    fontSize: 15,
    color: "black"
  },
  circle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width * 0.17,
    borderRadius: 400,
    backgroundColor: "#3B4859"
  },
  division: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  enderecosUsuario: state.enderecosUsuario.enderecosUsuario
});

export default connect(
  mapStateToProps,
  { getEnderecoUsuario, getPlace, setOrigin }
)(MyPlacesScreen);
