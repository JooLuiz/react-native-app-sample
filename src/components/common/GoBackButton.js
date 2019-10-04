import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export default class GoBackButton extends Component {
  render() {
    return (
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 20,
    top: 20
  }
});
