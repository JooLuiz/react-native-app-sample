import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";

class LoginOrCreateForm extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    cpf: ""
  };

  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  onEmailChange(text) {
    this.setState({ email: text });
  }

  onCPFChange(text) {
    this.setState({ cpf: text });
  }

  handleRequest() {
    const payload = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.props.create) {
      payload.email = this.state.email;
      payload.cpf = this.state.cpf;
      this.props.register(payload);
    } else {
      this.props.login(payload);
    }
  }

  renderEmailField() {
    if (this.props.create) {
      return (
        <View>
          <TextInput
            placeholder="Email"
            autoCorrect={false}
            onChangeText={this.onEmailChange.bind(this)}
            style={{ padding: 15 }}
          />
        </View>
      );
    }
  }

  renderCPFField() {
    if (this.props.create) {
      return (
        <View>
          <TextInput
            placeholder="CPF"
            autoCorrect={false}
            onChangeText={this.onCPFChange.bind(this)}
            style={{ padding: 15 }}
          />
        </View>
      );
    }
  }

  renderButton() {
    const buttonText = this.props.create ? "Registrar" : "Login";

    return (
      <Button onPress={this.handleRequest.bind(this)} title={buttonText} />
    );
  }

  renderCreateLink() {
    if (!this.props.create) {
      return (
        <Text
          style={{ color: "blue" }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          Cadastre-se
        </Text>
      );
    }
  }

  render() {
    return (
      <View>
        <View>
          <View>
            <TextInput
              placeholder="Nome de Usuário"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onUsernameChange.bind(this)}
              style={styles.inputs}
            />
          </View>
          {this.renderEmailField()}
          {this.renderCPFField()}
          <View>
            <TextInput
              secureTextEntry
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onPasswordChange.bind(this)}
              style={styles.inputs}
            />
          </View>
        </View>
        {this.renderButton()}
        {this.renderCreateLink()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    backgroundColor: "lightgrey",
    padding: 10,
    marginBottom: 15,
    borderRadius: 100
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 15,
    backgroundColor: "#2E64FE"
  },
  register: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 15,
    backgroundColor: "#04B431"
  }
});

export default connect(
  null,
  { login, register }
)(LoginOrCreateForm);
