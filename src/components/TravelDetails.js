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
        let { latitude, longitude } = position.coords;
        let latitudeMinorRange = latitude - 0.005525;
        let latitudeMajorRange = latitude + 0.005525;
        let longitudeMinorRange = longitude - 0.005525;
        let longitudeMajorRange = longitude + 0.005525;
        let abslatitudeMinorRange = Math.abs(latitudeMinorRange);
        let abslatitudeMajorRange = Math.abs(latitudeMajorRange);
        let abslongitudeMinorRange = Math.abs(longitudeMinorRange);
        let abslongitudeMajorRange = Math.abs(longitudeMajorRange);

        if (abslongitudeMajorRange < abslongitudeMinorRange) {
          let aux = abslongitudeMinorRange;
          abslongitudeMinorRange = abslongitudeMajorRange;
          abslongitudeMajorRange = aux;
        }

        if (abslatitudeMajorRange < abslatitudeMinorRange) {
          let aux = abslatitudeMinorRange;
          abslatitudeMinorRange = abslatitudeMajorRange;
          abslatitudeMajorRange = aux;
        }
        if (this.props.directionsMessagePoints) {
          if (
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step + 1]
                .start_location.lat
            ) > abslatitudeMinorRange &&
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step + 1]
                .start_location.lat
            ) < abslatitudeMajorRange &&
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step + 1]
                .start_location.lng
            ) > abslongitudeMinorRange &&
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step + 1]
                .start_location.lng
            ) < abslongitudeMajorRange
          ) {
            this.setState({
              step: this.state.step + 1
            });
          } else if (
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step]
                .end_location.lat
            ) >= abslatitudeMinorRange &&
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step]
                .end_location.lat
            ) <= abslatitudeMajorRange &&
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step]
                .end_location.lng
            ) >= abslongitudeMinorRange &&
            Math.abs(
              this.props.directionsMessagePoints.steps[this.state.step]
                .end_location.lng
            ) <= abslongitudeMajorRange
          ) {
            this.setState({
              step: this.state.step + 1
            });
          } else {
            for (
              x = 0;
              x < this.props.directionsMessagePoints.steps.length;
              x++
            ) {
              var element = this.props.directionsMessagePoints.steps[x];
              if (
                Math.abs(element.start_location.lat) >= abslatitudeMinorRange &&
                Math.abs(element.start_location.lat) <= abslatitudeMajorRange &&
                Math.abs(element.start_location.lat) >=
                  abslongitudeMinorRange &&
                Math.abs(element.start_location.lat) <= abslongitudeMajorRange
              ) {
                this.setState({ step: index });
              } else {
              }
            }
          }
        } else {
          console.warn("Nao tem directions props.");
        }
      },
      error => {
        console.warn(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 100
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

export default connect(mapStateToProps, null)(TravelDetails);
