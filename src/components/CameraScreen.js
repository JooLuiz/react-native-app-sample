import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { RNCamera } from "react-native-camera";
import { addImagem, addPaths } from "../actions/imagens";
import { loading, loaded } from "../actions/loader";

const windowWidth = Dimensions.get("window").width;
var IMAGES_PER_ROW = 3;

class CameraScreen extends Component {
  static navigationOptions = {
    title: "Camera"
  };
  calculatedSize() {
    var size = windowWidth / IMAGES_PER_ROW;
    return { width: size, height: size, margin: 1 };
  }

  renderImagesInGroupsOf() {
    return this.props.imagens.map((image, i) => {
      return (
        <View
          style={{
            flex: 1,
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 1
          }}
          key={i}
        >
          <Image
            key={i}
            style={[this.calculatedSize()]}
            source={{ uri: image.uri }}
          />
        </View>
      );
    });
  }

  handleTakePicture = async () => {
    if (this.camera) {
      this.camera.resumePreview();
      const options = {
        quality: 0.5,
        base64: true
      };
      this.props.loading();
      const data = await this.camera.takePictureAsync(options);
      this.props.addImagem(data);
      this.props.addPaths({ uri: data.uri });
      this.props.loaded();
    }
  };

  renderImagesList() {
    return this.props.paths.length !== 0 ? this.renderImagesInGroupsOf() : null;
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
          <View
            style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={this.handleTakePicture.bind(this)}
              style={styles.capture}
            >
              <View style={styles.circle}></View>
            </TouchableOpacity>
          </View>
          {this.renderImagesList()}
        </View>
      </View>
    );
  }

  showResults = () => {
    console.log("VALUE1: " + this.state.value1);
    console.log("VALUE2: " + this.state.value2);
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: false };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
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
  }
});

const mapStateToProps = state => ({
  paths: state.imagens.paths,
  imagens: state.imagens.imagens
});

export default connect(mapStateToProps, {
  addImagem,
  addPaths,
  loading,
  loaded
})(CameraScreen);
