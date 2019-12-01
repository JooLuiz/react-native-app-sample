import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export class BottomButtons extends Component {
  render() {
    return (
      <View style={styles.navigationBottomButtons}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <FontAwesomeIcon icon="bars" color={"black"} size={20} />
          <Text style={{ color: "black" }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => this.props.navigation.navigate("Mapa")}
        >
          <FontAwesomeIcon icon="map-marked-alt" color={"black"} size={20} />
          <Text style={{ color: "black" }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() =>
            this.props.isAuthenticated
              ? this.props.navigation.navigate("Profile")
              : this.props.navigation.navigate("Login")
          }
        >
          <FontAwesomeIcon icon="user" color={"black"} size={20} />
          <Text style={{ color: "black" }}>Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navigationBottomButtons: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    backgroundColor: "#ffffff",
    borderTopColor: "black",
    borderTopWidth: 0.3
  },
  navigationButton: {
    height: Dimensions.get("window").width * 0.17,
    width: Dimensions.get("window").width / 3,
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(BottomButtons);
