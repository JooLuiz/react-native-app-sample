import React from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";
import GoBackButton from "./common/GoBackButton";

class Register extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return this.props.navigation.goBack();
    }
    return (
      <View>
        <GoBackButton navigation={this.props.navigation} title="Cadastro" />
        <View style={{ top: Dimensions.get("window").height * 0.2 }}>
          <View style={styles.input}>
            <LoginOrCreateForm navigation={this.props.navigation} create />
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
)(Register);
