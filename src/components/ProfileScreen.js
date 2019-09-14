import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import BottomButtons from "./BottomButtons";
import {AsyncStorage} from "react-native";

class ProfileScreen extends React.Component {

  render() {
	_retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('token');
			if(value == null) {
				return(this.props.navigation.navigate('Login'));
			}
		} catch (error) {
			console.error(error);
		}
	};
    return (
      	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        	<Text>Profile Screen</Text>
        	<BottomButtons navigation={this.props.navigation} />
      	</View>
    );
  }
}

const mapStateToProps = state => ({});

const styles = StyleSheet.create({});

export default connect(
  null,
  null
)(ProfileScreen);
