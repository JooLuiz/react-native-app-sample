import React from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import { setTravellingMode } from "../actions/map";

class SearchedPlaceDetail extends React.Component {
  showTravellingOptions() {
    return (
      <View style={styles.travellingModeView}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.props.travellingMode === "driving" ? "grey" : "white"
            }
          ]}
          onPress={() => this.props.setTravellingMode("driving")}
        >
          <Text>Dirigindo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.props.travellingMode === "transit" ? "grey" : "white"
            }
          ]}
          onPress={() => this.props.setTravellingMode("transit")}
        >
          <Text>Transporte Público</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.props.travellingMode === "bicycling" ? "grey" : "white"
            }
          ]}
          onPress={() => this.props.setTravellingMode("bicycling")}
        >
          <Text>Bibicleta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                this.props.travellingMode === "walking" ? "grey" : "white"
            }
          ]}
          onPress={() => this.props.setTravellingMode("walking")}
        >
          <Text>Andando</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.placeDetailsButton}>
        <View
          style={{
            height: Dimensions.get("window").width * 0.8,
            width: Dimensions.get("window").width,
            backgroundColor: "white"
          }}
        >
          <Text
            style={{ top: 5, color: "grey", fontSize: 12, alignSelf: "center" }}
          >
            Origem
          </Text>
          <Text
            style={{
              top: 8,
              color: "black",
              fontSize: 16,
              alignSelf: "center"
            }}
          >
            {this.props.origin.longName}
          </Text>
          <View
            style={{
              top: 11,
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.9,
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          />
          <Text
            style={{
              top: 10,
              color: "grey",
              fontSize: 12,
              alignSelf: "center"
            }}
          >
            Pesquisa
          </Text>
          <Text
            style={{
              top: 13,
              color: "black",
              fontSize: 16,
              alignSelf: "center"
            }}
          >
            {this.props.searchedPlace.longName}
          </Text>
          <View
            style={{
              top: 16,
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.9,
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          />
          {this.showTravellingOptions()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  travellingModeView: {
    flex: 1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 100,
    backgroundColor: "white",
    width: Dimensions.get("window").width
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "grey",
    marginHorizontal: Dimensions.get("window").width * 0.03
  },
  placeDetailsButton: {
    flex: 1,
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.09
  }
});

const mapStateToProps = state => ({
  searchedPlace: state.map.searchedPlace,
  origin: state.map.origin,
  travellingMode: state.map.travellingMode
});

export default connect(
  mapStateToProps,
  { setTravellingMode }
)(SearchedPlaceDetail);
