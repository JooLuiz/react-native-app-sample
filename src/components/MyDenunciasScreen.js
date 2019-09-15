import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import BottomButtons from "./BottomButtons";

class MyDenunciasScreen extends React.Component {
  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Denuncias Screen</Text>
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const styles = StyleSheet.create({});

export default connect(
  mapStateToProps,
  null
)(MyDenunciasScreen);
