import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export class BottomButtons extends Component {
  render() {
    return (
      <View style={styles.navigationBottomButtons}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <FontAwesomeIcon icon='bars' color={'white'} size={20} />
          <Text style={{ color: "white" }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.navigate("Mapa")}
        >
          <FontAwesomeIcon icon='map-marked-alt' color={'white'} size={20} />
          <Text style={{ color: "white" }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <FontAwesomeIcon icon='user' color={'white'} size={20} />
          <Text style={{ color: "white" }}>Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navigationBottomButtons: {
    flex: 1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    backgroundColor: "#363636"
  },
  navigationButton: {
    flex: 1,
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width / 3,
    backgroundColor: "#363636",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderRightColor: '#4F4F4F'
  }
});

export default BottomButtons;
