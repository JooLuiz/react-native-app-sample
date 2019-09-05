import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import LoginOrCreateForm from "./common/LoginOrCreateForm";
import BottomButtons from "./BottomButtons";

class Login extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, padding: 15 }}>Login</Text>
                <LoginOrCreateForm navigation={ this.props.navigation }/>
            </View>
        );
    }
}

export default connect()(Login);