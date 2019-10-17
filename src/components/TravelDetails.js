import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Geolocation from "@react-native-community/geolocation";

class TravelDetails extends React.Component {
  state = {
    step: 0
  };
  componentDidMount() {
    this.watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.warn("oi");
        if (this.props.directionsMessagePoints) {
          if (
            this.props.directionsMessagePoints.steps[this.state.step]
              .start_location.lat == latitude &&
            this.props.directionsMessagePoints.steps[this.state.step]
              .start_location.lng == longitude
          ) {
            console.warn("if 1");
            this.setState({
              step: this.state.step + 1
            });
          } else if (
            this.props.directionsMessagePoints.steps[this.state.step]
              .end_location.lat == latitude &&
            this.props.directionsMessagePoints.steps[this.state.step]
              .end_location.lng == longitude
          ) {
            console.warn("if 2");
            this.setState({
              step: this.state.step + 1
            });
          }
        } else {
          console.warn("if 4.1");
          this.props.directionsMessagePoints.steps.forEach(element, index => {
            if (
              element.start_location.lat == latitude &&
              element.start_location.lat == longitude
            ) {
              console.warn("if 4.2");
              this.setState({ step: index });
            }
          });
        }
      },
      error => {
        console.warn(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 100
      }
    );
  }

  render() {
    return (
      <View style={styles.travelDetail}>
        <View style={styles.insideDetail}>
          <Text style={styles.messageDistanceDetail}>
            {
              this.props.directionsMessagePoints.steps[this.state.step].distance
                .text
            }{" "}
            - Aproximadamente{" "}
            {
              this.props.directionsMessagePoints.steps[this.state.step].duration
                .text
            }
          </Text>
          <Text style={styles.messageDetail}>
            {
              this.props.directionsMessagePoints.steps[this.state.step]
                .html_instructions
            }
          </Text>
          <View style={styles.division} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  travelDetail: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * -0.02
  },
  insideDetail: {
    height: Dimensions.get("window").width * 0.8,
    width: Dimensions.get("window").width,
    backgroundColor: "white"
  },
  messageDistanceDetail: {
    top: 10,
    color: "grey",
    fontSize: 15,
    alignSelf: "flex-start",
    marginRight: Dimensions.get("window").width * 0.07,
    marginLeft: Dimensions.get("window").width * 0.07
  },
  messageDetail: {
    top: 20,
    color: "black",
    fontSize: 22,
    alignSelf: "flex-start",
    height: Dimensions.get("window").width * 0.29,
    marginRight: Dimensions.get("window").width * 0.07,
    marginLeft: Dimensions.get("window").width * 0.07
  },
  division: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});

const mapStateToProps = state => ({
  directionsDetail: state.map.directionsDetail,
  directionsMessagePoints: state.map.directionsMessagePoints
});

export default connect(
  mapStateToProps,
  null
)(TravelDetails);
