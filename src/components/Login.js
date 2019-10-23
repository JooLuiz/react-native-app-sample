import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";
import GoBackButton from "./common/GoBackButton";

class Login extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return this.props.navigation.goBack();
    }
    return (
        <View>
          <GoBackButton navigation={this.props.navigation} title="Login" />
          <View style={{ top: Dimensions.get("window").height * 0.25 }}>
            <View style={styles.input}>
              <LoginOrCreateForm navigation={this.props.navigation} />
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    marginBottom: 50,
    alignSelf: "center"
  },
  text: {
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Login);
