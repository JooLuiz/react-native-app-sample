import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

export default class GoBackButton extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "#C0CCDA" }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              color={"white"}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.division} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get("window").height * 0.09,
    width: Dimensions.get("window").width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5,
    left: Dimensions.get("window").height * 0.025,
    top: Dimensions.get("window").height * 0.025
  },
  backButton: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.2
  },
  division: {
    alignSelf: "center",
    width: Dimensions.get("window").width,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});
