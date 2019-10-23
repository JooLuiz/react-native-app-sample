import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import { login, register } from "../../actions/auth";

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
            style={styles.inputs}
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
            style={styles.inputs}
          />
        </View>
      );
    }
  }

  renderButton() {
    const buttonText = this.props.create ? "Registrar" : "Login";

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={this.handleRequest.bind(this)}>
        <View style={styles.button}>
          <Text style={{ color: 'white' }}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCreateLink() {
    if (!this.props.create) {
      return (
        <View style={styles.register}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={{ color: 'white' }}>Ainda não possui cadastro? Clique aqui!</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#1b90e3",
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
  	  height: 12,
    },
    shadowOpacity: 0.80,
    shadowRadius: 16.00,
    elevation: 24
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
