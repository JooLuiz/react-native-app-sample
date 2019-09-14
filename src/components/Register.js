import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";
import BottomButtons from "./BottomButtons";

class Register extends React.Component {
    render() {
        if (this.props.isAuthenticated) {
            return this.props.navigation.navigate('Perfil');
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, padding: 15}}>Cadastro</Text>
                <LoginOrCreateForm navigation={ this.props.navigation } create />
                <BottomButtons navigation={this.props.navigation} />
            </View>
        );
    }
}

export default connect()(Register);
