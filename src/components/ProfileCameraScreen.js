import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Text
} from "react-native";
import { RNCamera } from "react-native-camera";
import { editUser } from "../actions/auth";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class ProfileCameraScreen extends Component {
  static navigationOptions = {
    title: "Foto de Perfil"
  };

  state = {
    imagem: null
  };
  calculatedSize() {
    return { width: windowWidth, height: windowHeight * 0.74, margin: 1 };
  }

  renderImagesInGroupsOf() {
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          style={[this.calculatedSize()]}
          source={{ uri: this.state.imagem.uri }}
        />
      </View>
    );
  }

  handleTakePicture = async () => {
    if (this.camera) {
      this.camera.resumePreview();
      const options = {
        quality: 0.5,
        base64: true
      };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ imagem: data });
    }
  };

  renderImagesList() {
    return this.state.imagem != null ? this.renderImagesInGroupsOf() : null;
  }

  takeAnother() {
    this.setState({
      imagem: null
    });
  }

  confirm() {
    this.props.editUser(this.props.user, this.state.imagem, "avatar");
  }

  renderCameraButtonOrConfirm() {
    return this.state.imagem == null ? (
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={this.handleTakePicture.bind(this)}
          style={styles.capture}
        >
          <View style={styles.circle}></View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.takeAnother.bind(this)}
          style={[{ backgroundColor: "red" }, styles.afterCapture]}
        >
          <Text>Tirar outra foto?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.confirm.bind(this)}
          style={[{ backgroundColor: "green" }, styles.afterCapture]}
        >
          <Text>Confirmar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.subcontainer}>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
          />
          {this.renderImagesList()}
          {this.renderCameraButtonOrConfirm()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.15,
    borderRadius: 400,
    borderWidth: 2,
    backgroundColor: "red"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  subcontainer: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    alignItems: "center",
    margin: 20,
    width: Dimensions.get("window").width
  },
  afterCapture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "stretch",
    alignItems: "center",
    margin: 20,
    width: Dimensions.get("window").width * 0.4
  }
});
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { editUser })(ProfileCameraScreen);
