import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Dimensions, Text } from "react-native";

export default class EmptyList extends React.Component {
  render() {
    return (
      <View style={styles.emptyItem}>
        <FontAwesomeIcon icon="frown" size={150} />
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  emptyItem: {
    height: Dimensions.get("window").height * 0.6,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
