import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import BottomButtons from "./BottomButtons";
import { ScrollView } from "react-native-gesture-handler";

class ProfileScreen extends React.Component {
  	render() {
    	if (!this.props.isAuthenticated) {
      		return this.props.navigation.navigate("Login");
    	}
    	console.warn(this.props.token);
    	return (
			<View style={styles.container}>
				<View style={styles.profile}>

				</View>
				<ScrollView>
					<View style={styles.options}>
						<Text>Profile Screen</Text>
					</View>
				</ScrollView>
				<BottomButtons navigation={this.props.navigation} />
			</View>
    	);
  	}
}

const styles = StyleSheet.create({
  	container:{
    	flex: 1
  	},
  	profile:{
    	padding: 100,
    	backgroundColor: '#EAE9E9'
	},
	options:{
		borderBottomWidth: 0.5,
		padding: 20,
		justifyContent: 'center'
	}
});

const mapStateToProps = state => ({
  	isAuthenticated: state.auth.isAuthenticated,
  	token: state.auth.token
});

export default connect(
  	mapStateToProps,
  	null
)(ProfileScreen);
