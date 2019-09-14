import React, {Component} from "react";
import { connect } from "react-redux";
import {Button, View, Text, TextInput, StyleSheet} from "react-native";
import {login, register} from "../../actions/auth";

class LoginOrCreateForm extends Component {

    state = {
        username: '',
        password: '',
        email: ''
    }

    onUsernameChange(text) {
        this.setState({ username: text });
    }
    
    onPasswordChange(text) {
        this.setState({ password: text });
    }
    
    onEmailChange(text) {
        this.setState({ email: text });
    }

    handleRequest() {
        const payload = { username: this.state.username, password: this.state.password }
        if(this.props.create) {
            payload.email = this.state.email;
            this.props.register(payload);
        } else {
            this.props.login(payload);
        }
    }

    renderCreateForm(){
        if(this.props.create){
            return(
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

    renderButton() {
        const buttonText = this.props.create ? "Registrar" : "Login";

        return (
            <Button onPress={this.handleRequest.bind(this)} title={buttonText} />
        );
    }

    renderCreateLink() {
        if(!this.props.create) {
            return (
                <Text style={{ color: 'blue' }} onPress={ () => this.props.navigation.navigate('Register') }>
                    Cadastre-se
                </Text>
            );
        }
    }

    render() {
        return(
            <View>
                <View>
                    <View>
                        <TextInput
                            placeholder="Nome de Usuário"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={this.onUsernameChange.bind(this)}
                            style={{ padding: 15 }}
                        />
                    </View>
                    {this.renderCreateForm()}
                    <View>
                        <TextInput
                            secureTextEntry
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={this.onPasswordChange.bind(this)}
                            style={{ padding: 15 }}
                        />
                    </View>
                </View>
                <View style={{ alignContent: "center" }}>
                    {this.renderButton()}
                    <View style={{ alignContent: "center" }}>
                        {this.renderCreateLink()}
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({

});

export default connect(
    null,
    {login, register}
)(LoginOrCreateForm);
