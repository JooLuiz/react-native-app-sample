import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { changeVisibility } from "../../actions/notifications";
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";

class Notifications extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visibility}
        onRequestClose={() => {
          this.props.changeVisibility(false);
        }}
        onShow={() =>
          setTimeout(() => this.props.changeVisibility(false), 3000)
        }
      >
        <View style={ styles.modalOutiseView }>
          <View style={
              {
              borderWidth: 4,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor:
                this.props.type == "success"
                  ? "#008c0c"
                  : this.props.type == "error"
                  ? "#F90707"
                  : "#040012"
            }}
          />
          <View>
            <TouchableOpacity
              style={{
                top: Dimensions.get("window").height * 0.01,
                left: Dimensions.get("window").width * 0.85,
                height: Dimensions.get("window").height * 0.02
              }}
              onPress={() => {
                this.props.changeVisibility(false);
              }}
            >
              <FontAwesomeIcon
                icon={"times-circle"}
                color={"black"}
                size={18}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{this.props.message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOutiseView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    top: 10,
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").width * 0.2,
    alignContent: "stretch",
    alignSelf: "center",
    justifyContent: 'flex-start',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    borderRadius: 5 
  },
  modalTitle: {
    left: 5,
    color: "black",
    fontSize: 15
  }
});

const mapStateToProps = state => ({
  visibility: state.notifications.visibility,
  message: state.notifications.message,
  type: state.notifications.type
});

export default connect(mapStateToProps, { changeVisibility })(Notifications);
