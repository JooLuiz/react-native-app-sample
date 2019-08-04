import React from "react";
import { connect } from "react-redux";
import { agoraVai } from "../actions/test";
import { View, StyleSheet, Button } from "react-native";
import MapView from "react-native-maps";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  openModal = () => {
    this.props.agoraVai("mano sera q vai");
  };

  closeModal = () => {
    this.props.agoraVai("Teste 2");
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
        />
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
        {/* <Button title="Open Modal" onPress={() => this.openModal()} />
        <Button title="Close Modal" onPress={() => this.closeModal()} />


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
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = state => ({
  msg: state.errors.msg,
  status: state.errors.status
});

export default connect(
  mapStateToProps,
  { agoraVai }
)(HomeScreen);
