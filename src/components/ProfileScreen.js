import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import BottomButtons from "./BottomButtons";
import { AsyncStorage } from "react-native";

class ProfileScreen extends React.Component {
  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
