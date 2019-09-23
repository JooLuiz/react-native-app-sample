import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import BottomButtons from "./BottomButtons";
import {
  getTipoDenuncias,
  setCurrentTipoDenuncia
} from "../actions/tipoDenuncias";

class TipoDenunciaScreen extends React.Component {
  componentWillMount() {
    this.props.getTipoDenuncias();
  }

  setTipoDenunciaAndGo(tipoDenuncia) {
    this.props.setCurrentTipoDenuncia(tipoDenuncia);
    this.props.navigation.navigate("Denuncia");
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={this.props.tipoDenuncias}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.setTipoDenunciaAndGo(item)}>
              <View style={styles.listItem}>
                <Text>{item.id}</Text>
                <Text>{item.descricao}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  tipoDenuncias: state.tipoDenuncias.tipoDenuncias
});

const styles = StyleSheet.create({
  listItem: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(
  mapStateToProps,
  { getTipoDenuncias, setCurrentTipoDenuncia }
)(TipoDenunciaScreen);