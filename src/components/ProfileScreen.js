import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import BottomButtons from "./BottomButtons";
import GoBackButton from "./common/GoBackButton";
import { ScrollView, FlatList } from "react-native-gesture-handler";

class ProfileScreen extends React.Component {
  	render() {
    	if (!this.props.isAuthenticated) {
      		return this.props.navigation.navigate("Login");
    	}
    	return (
			<View style={styles.container}>
				<GoBackButton navigation={this.props.navigation} />
				<View style={styles.profile}>
					<View style={styles.photo}>

					</View>
					<FlatList
						data={this.props.loadUser}
						renderItem={({item}) => 
							<Text style={{ marginTop: 30, fontSize: 20 }}>
								{this.props.auth.filter(profile => profile.id == item.username)
								[0].username}
							</Text>
						}
					/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    padding: 50,
    backgroundColor: "#EAE9E9",
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    borderBottomWidth: 0.5,
    padding: 20,
    justifyContent: "center"
  },
  photo: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "black",
    padding: 80
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
	loadUser: state.auth.loadUser,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
