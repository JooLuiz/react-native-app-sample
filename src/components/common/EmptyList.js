import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";

export default class EmptyList extends React.Component {
  render() {
    return (
      <View style={styles.emptyItem}>
        <FontAwesomeIcon icon="frown" size={150} />
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            width: Dimensions.get("window").width * 0.6
          }}
        >
          {this.props.text}
        </Text>
        <Button
          style={{ width: Dimensions.get("window").width * 0.6 }}
          onPress={() => this.props.navigation.goBack()}
          title="Voltar"
        ></Button>
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
