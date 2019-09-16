import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";

class Login extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return this.props.navigation.goBack();
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30, padding: 15 }}>Login</Text>
        <LoginOrCreateForm navigation={this.props.navigation} />
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
)(Login);
