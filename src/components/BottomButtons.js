import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

export class BottomButtons extends Component {
  render() {
    return (
      <View style={styles.navigationBottomButtons}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Text style={{ color: "black" }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.navigate("Mapa")}
        >
          <Text style={{ color: "black" }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <Text style={{ color: "black" }}>Perfil</Text>
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
    bottom: 0
  },
  navigationButton: {
    flex: 1,
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width / 3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default BottomButtons;
