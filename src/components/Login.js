import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm"
import GoBackButton from './common/GoBackButton';

class Login extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return this.props.navigation.goBack();
    }
    return (
      <View style={styles.container}>
        <GoBackButton navigation={this.props.navigation} />
        <Text style={styles.text}>Login</Text>
        <View style={styles.input}>
          <LoginOrCreateForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:  'center'
  },
  input: {
    width: '80%',
    marginBottom: 50
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
)(Login);
