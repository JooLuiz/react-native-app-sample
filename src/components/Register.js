import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";

class Register extends React.Component {
  static navigationOptions = {
    title: "Cadastro"
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View>
              <View style={styles.input}>
                <LoginOrCreateForm navigation={this.props.navigation} create />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#ffffff"
  },
  input: {
    width: "80%",
    marginBottom: 50,
    alignSelf: "center",
    marginTop: Dimensions.get("window").height * 0.03
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

export default connect(mapStateToProps, null)(Register);
