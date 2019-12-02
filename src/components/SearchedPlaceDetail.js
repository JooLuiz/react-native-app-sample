import React from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import { Chip } from 'react-native-paper';
import { setOrigin, setTravellingMode, getPlace } from "../actions/map";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

class SearchedPlaceDetail extends React.Component {
  state = {
    modalOrigemVisible: false,
    modalSearchedPlaceVisible: false,
    modalText: null
  };

  showTravellingOptions() {
    return (
      <View style={styles.travellingModeView}>
        <Chip
          icon={() => <FontAwesomeIcon icon="car" />}
          selected={this.props.travellingMode === "driving" ? true : false}
          onPress={() => this.props.setTravellingMode("driving")}
        >
          Dirigindo
        </Chip>
        <Chip
          icon={() => <FontAwesomeIcon icon="bus" />}
          selected={this.props.travellingMode === "transit" ? true : false}
          onPress={() => this.props.setTravellingMode("transit")}
        >
          Público
        </Chip>
        <Chip
          icon={() => <FontAwesomeIcon icon="bicycle" />}
          selected={this.props.travellingMode === "bicycling" ? true : false}
          onPress={() => this.props.setTravellingMode("bicycling")}
        >
          Bike
        </Chip>
        <Chip
          icon={() => <FontAwesomeIcon icon="walking" />}
          selected={this.props.travellingMode === "walking" ? true : false}
          onPress={() => this.props.setTravellingMode("walking")}
        >
          Andando
        </Chip>
      </View>
    );
  }

  ToggleModal(type) {
    if (type == "origem") {
      this.setState({ modalOrigemVisible: !this.state.modalOrigemVisible });
    } else if ((type = "searchedPlace")) {
      this.setState({
        modalSearchedPlaceVisible: !this.state.modalSearchedPlaceVisible
      });
    }
  }

  render() {
    return (
      <View style={styles.placeDetailsButton}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalOrigemVisible}
          onRequestClose={() => {
            this.ToggleModal("origem");
          }}
        >
          <View style={styles.modalOutiseView}>
            <Text style={styles.modalTitle}>Digite sua Nova Origem</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Origem"
              onChangeText={modalText => this.setState({ modalText })}
              value={this.state.modalText}
            />
            <View style={styles.modalButtonsView}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalOrigemVisible: false });
                }}
              >
                <View
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "red"
                    }
                  ]}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setOrigin(this.state.modalText, "address");
                  this.setState({
                    modalOrigemVisible: false,
                    modalText: null
                  });
                }}
              >
                <View
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "green"
                    }
                  ]}
                >
                  <Text style={styles.modalButtonText}>Confirmar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalSearchedPlaceVisible}
          onRequestClose={() => {
            this.ToggleModal("searchedPlace");
          }}
        >
          <View style={styles.modalOutiseView}>
            <Text style={styles.modalTitle}>Digite seu Novo Destino</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Destino"
              onChangeText={modalText => this.setState({ modalText })}
              value={this.state.modalText}
            />
            <View style={styles.modalButtonsView}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalSearchedPlaceVisible: false });
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    height: Dimensions.get("window").height * 0.05,
                    width: Dimensions.get("window").width * 0.3,
                    borderRadius: 4,
                    backgroundColor: "red"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center"
                    }}
                  >
                    Cancelar
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.getPlace(this.state.modalText, "address");
                  this.setState({
                    modalSearchedPlaceVisible: false,
                    modalText: null
                  });
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    height: Dimensions.get("window").height * 0.05,
                    width: Dimensions.get("window").width * 0.3,
                    borderRadius: 4,
                    backgroundColor: "green"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center"
                    }}
                  >
                    Confirmar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.insideDetail}>
          <TouchableOpacity onPress={() => this.ToggleModal("origem")}>
            <Text style={styles.originTitle}>Origem</Text>
            <Text style={styles.originDescription}>
              {this.props.origin.longName}
            </Text>
            <View style={styles.originDivision} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.ToggleModal("searchedPlace")}>
            <Text style={styles.destinationTitle}>Pesquisa</Text>
            <Text style={styles.destinationDescription}>
              {this.props.searchedPlace.longName}
            </Text>
            <View style={styles.destinationDivisor} />
          </TouchableOpacity>
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
    bottom: Dimensions.get("window").height * -0.02
  },
  insideDetail: {
    height: Dimensions.get("window").width * 0.8,
    width: Dimensions.get("window").width,
    backgroundColor: "white"
  },
  originTitle: {
    top: 5,
    color: "grey",
    fontSize: 12,
    alignSelf: "center"
  },
  originDescription: {
    top: 8,
    color: "black",
    fontSize: 16,
    alignSelf: "center"
  },
  originDivision: {
    top: 11,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  destinationTitle: {
    top: 10,
    color: "grey",
    fontSize: 12,
    alignSelf: "center"
  },
  destinationDescription: {
    top: 13,
    color: "black",
    fontSize: 16,
    alignSelf: "center"
  },
  destinationDivisor: {
    top: 16,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  modalOutiseView: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.5,
    top: Dimensions.get("window").width * 0.5,
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    borderColor: "gray",
    borderWidth: 1
  },
  modalTitle: {
    top: Dimensions.get("window").width * 0.05,
    color: "grey",
    alignSelf: "center"
  },
  modalTextInput: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width * 0.7,
    top: Dimensions.get("window").width * 0.12,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 7,
    alignSelf: "center"
  },
  modalButtonsView: {
    top: Dimensions.get("window").width * 0.17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  modalButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: 4
  },
  modalButtonText: {
    color: "white",
    alignSelf: "center"
  }
});

const mapStateToProps = state => ({
  searchedPlace: state.map.searchedPlace,
  origin: state.map.origin,
  travellingMode: state.map.travellingMode
});

export default connect(
  mapStateToProps,
  { setTravellingMode, setOrigin, getPlace }
)(SearchedPlaceDetail);
