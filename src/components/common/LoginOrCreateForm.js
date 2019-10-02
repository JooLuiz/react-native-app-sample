import React, {Component} from "react";
import { connect } from "react-redux";
import {TouchableOpacity, View, Text, TextInput, StyleSheet} from "react-native";
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
                        style={styles.inputs}
                    />
                </View>
            );
        }
    }

    renderButton() {
        const buttonText = this.props.create ? "Registrar" : "Login";

        return (
            <View style={styles.button}>
                <TouchableOpacity onPress={this.handleRequest.bind(this)}>
                    <Text style={{ color: 'white' }}> {buttonText} </Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderCreateLink() {
        if(!this.props.create) {
            return (
                <View style={styles.register}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ color: 'white' }}> Ainda não tem Cadastro? Clique aqui! </Text>
                    </TouchableOpacity>
                </View>
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
                            style={styles.inputs}
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
        backgroundColor: 'lightgrey',
        padding: 10,
        marginBottom: 15,
        borderRadius: 100
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginBottom: 15,
        backgroundColor: '#2E64FE'
    },
    register: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginBottom: 15,
        backgroundColor: '#04B431'
    }
});

export default connect(
    null,
    {login, register}
)(LoginOrCreateForm);
