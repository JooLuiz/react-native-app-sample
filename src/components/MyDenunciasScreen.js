import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

class MyDenunciasScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.props.msg}</Text>
        <Text>{this.props.status}</Text>
        <Text>Denuncias Screen</Text>
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
  msg: state.errors.msg,
  status: state.errors.status
});

export default connect(
  mapStateToProps,
  null
)(MyDenunciasScreen);
