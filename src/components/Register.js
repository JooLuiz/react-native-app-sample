import React from "react";
import { connect } from "react-redux";
import { ImageBackground, View, Text, StyleSheet } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";
import GoBackButton from "./common/GoBackButton";

class Register extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return this.props.navigation.goBack();
    }
    return (
        <View style={styles.container}>
          <GoBackButton navigation={this.props.navigation}/>
          <Text style={styles.text}>Cadastro</Text>
          <View style={styles.input}>
            <LoginOrCreateForm navigation={this.props.navigation} create />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
  },
  text: {
    alignItems: 'center',
    padding: 20,
    fontSize: 20
  }
})

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Register);
