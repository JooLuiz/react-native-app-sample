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
        <View
          style={[
            styles.modalOutiseView,
            {
              backgroundColor:
                this.props.type == "success"
                  ? "#008c0c"
                  : this.props.type == "error"
                  ? "#8c0000"
                  : "#040012"
            }
          ]}
        >
          <View>
            <TouchableOpacity
              style={{
                top: Dimensions.get("window").height * 0.02,
                left: Dimensions.get("window").width * 0.88,
                height: Dimensions.get("window").height * 0.02
              }}
              onPress={() => {
                this.props.changeVisibility(false);
              }}
            >
              <FontAwesomeIcon
                icon={"times-circle"}
                color={"white"}
                size={22}
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.3,
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 7,
    borderColor: "gray",
    borderWidth: 1,
    borderTopWidth: 0
  },
  modalTitle: {
    top: Dimensions.get("window").width * 0.1,
    alignSelf: "center",
    color: "white",
    fontSize: 20
  }
});

const mapStateToProps = state => ({
  visibility: state.notifications.visibility,
  message: state.notifications.message,
  type: state.notifications.type
});

export default connect(mapStateToProps, { changeVisibility })(Notifications);
