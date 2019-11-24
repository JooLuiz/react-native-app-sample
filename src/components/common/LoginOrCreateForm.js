import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { login, register } from "../../actions/auth";
import { getDenuncias } from "../../actions/denuncias";
import { getEnderecoUsuario } from "../../actions/enderecosUsuario";

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
    this.props.getDenuncias();
    this.props.getEnderecoUsuario();
  }

  renderEmailField() {
    if (this.props.create) {
      return (
        <View>
          <HelperText
            type="error"
            visible={
              (!this.state.email.includes("@") && this.state.email != "") ||
              this.state.email == null ||
              this.state.email == ""
            }
          >
            {this.state.email == ""
              ? "o campo E-mail é obrigatório!"
              : "Endereço de e-mail é inválido!"}
          </HelperText>
          <TextInput
            label="Email"
            mode="outlined"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.onEmailChange.bind(this)}
            style={styles.inputs}
            value={this.state.email}
          />
        </View>
      );
    }
  }

  renderCPFField() {
    if (this.props.create) {
      return (
        <View>
          <HelperText
            type="error"
            visible={this.state.cpf == null || this.state.cpf == ""}
          >
            o campo CPF é obrigatório!
          </HelperText>
          <TextInput
            label="CPF"
            mode="outlined"
            autoCorrect={false}
            onChangeText={this.onCPFChange.bind(this)}
            style={styles.inputs}
            value={this.state.cpf}
          />
        </View>
      );
    }
  }

  renderButton() {
    const buttonText = this.props.create ? "Registrar" : "Login";

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.handleRequest.bind(this)}
      >
        <View style={styles.button}>
          <Text style={{ color: "white" }}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCreateLink() {
    if (!this.props.create) {
      return (
        <View style={styles.register}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "white" }}>
              Ainda não possui cadastro? Clique aqui!
            </Text>
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
            <HelperText
              type="error"
              visible={this.state.username == null || this.state.username == ""}
            >
              o campo Usuário é obrigatório!
            </HelperText>
            <TextInput
              label="Usuário"
              autoCorrect={false}
              mode="outlined"
              autoCapitalize="none"
              onChangeText={this.onUsernameChange.bind(this)}
              style={styles.inputs}
              value={this.state.username}
            />
          </View>
          {this.renderEmailField()}
          {this.renderCPFField()}
          <View>
            <HelperText
              type="error"
              visible={this.state.password == null || this.state.password == ""}
            >
              o campo Senha é obrigatório!
            </HelperText>
            <TextInput
              secureTextEntry
              label="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              mode="outlined"
              onChangeText={this.onPasswordChange.bind(this)}
              style={styles.inputs}
              value={this.state.password}
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
    marginBottom: 15
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
      height: 12
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 24
  },
  container: {
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#ffffff"
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

export default connect(null, {
  login,
  register,
  getDenuncias,
  getEnderecoUsuario
})(LoginOrCreateForm);
