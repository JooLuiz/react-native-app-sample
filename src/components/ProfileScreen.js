import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.props.initialPosition.latitude}</Text>
        <Text>{this.props.initialPosition.longitude}</Text>
        <Text>Profile Screen</Text>
        <View style={{ flex: 1, position: "absolute", bottom: 0 }}>
          <Button
            title="Menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Button
            title="Home"
            onPress={() => this.props.navigation.navigate("Mapa")}
          />
          <Button
            title="Profile"
            onPress={() => this.props.navigation.navigate("Profile")}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  initialPosition: state.map.initialPosition
});

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
