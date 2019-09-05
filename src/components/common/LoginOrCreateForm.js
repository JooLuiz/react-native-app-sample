import React, {Component} from "react";
import {Button, View, Text, TextInput, StyleSheet} from "react-native";
import axios from "axios";

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
        const endpoint = this.props.create ? 'register' : 'login';
        const payload = { username: this.state.username, password: this.state.password }
        if(this.props.create) {
            payload.email = this.state.email;
        }
        
        let path = `/auth/${endpoint}/`;
        console.warn(path)
        console.warn(payload)
        axios
        .post(path, payload)
        .then(response => {
                console.warn(response)
                const {token, user} = response.data;
                axios.defaults.headers.common.Authorization = `Token ${token}`;
                this.props.navigation.navigate('Mapa');
            })
            .catch(error => console.warn(error));
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
        const buttonText = this.props.create ? 'Registrar' : 'Login';

        return (
            <Button title={buttonText} onPress={this.handleRequest.bind(this)} />
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
                <View>
                    {this.renderButton()}
                    <View>
                        {this.renderCreateLink()}
                    </View>
                </View>
            </View>
        );
    }
}

export default LoginOrCreateForm;