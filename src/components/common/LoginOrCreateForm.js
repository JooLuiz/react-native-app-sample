import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
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
              ? "O campo E-mail é obrigatório!"
              : "Endereço de e-mail é inválido!"}
          </HelperText>
          <TextInput
            label="Email"
            mode="outlined"
            underlineColor={"#3A35CD"}
            selectionColor={"#3A35CD"}
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
            O campo CPF é obrigatório!
          </HelperText>
          <TextInput
            label="CPF"
            mode="outlined"
            underlineColor={"#3A35CD"}
            selectionColor={"#3A35CD"}
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
      <Button
        mode="contained"
        onPress={this.handleRequest.bind(this)}
        color={'#3A35CD'}
      >
        {buttonText}
      </Button>
    );
  }

  renderCreateLink() {
    if (!this.props.create) {
      return (
          <Button
            style={{ marginTop: 15 }}
            color={'#2DAE42'}
            mode="contained"
            onPress={() => this.props.navigation.navigate("Register")}
          >
              Faça seu registro!
          </Button>
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
              O campo Usuário é obrigatório!
            </HelperText>
            <TextInput
              label="Usuário"
              autoCorrect={false}
              mode="outlined"
              underlineColor={"#3A35CD"}
              selectionColor={"#3A35CD"}
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
              O campo Senha é obrigatório!
            </HelperText>
            <TextInput
              secureTextEntry
              label="Senha"
              underlineColor={"#3A35CD"}
              selectionColor={"#3A35CD"}
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
  container: {
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#ffffff"
  }
});

export default connect(null, {
  login,
  register,
  getDenuncias,
  getEnderecoUsuario
})(LoginOrCreateForm);
