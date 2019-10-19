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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyList from "./common/EmptyList";
import GoBackButton from "./common/GoBackButton";

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
        <GoBackButton
          navigation={this.props.navigation}
          title="Tipo de Denúncia"
        />
        <FlatList
          data={this.props.tipoDenuncias}
          ListEmptyComponent={
            <EmptyList text="Ainda não existem Tipos de Denúncia Cadastradas." />
          }
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.setTipoDenunciaAndGo(item)}>
              <View>
                <View style={styles.listItens}>
                  <FontAwesomeIcon
                    icon={item.icone}
                    color={"black"}
                    size={30}
                  />
                  <View style={styles.itemName}>
                    <Text style={styles.nameText}>{item.descricao}</Text>
                  </View>
                </View>
                <View style={styles.division} />
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
  itemName: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    left: Dimensions.get("window").width * 0.03
  },
  listItens: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    left: Dimensions.get("window").height * 0.025
  },
  nameText: {
    fontSize: 15,
    color: "black"
  },
  division: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});

export default connect(
  mapStateToProps,
  { getTipoDenuncias, setCurrentTipoDenuncia }
)(TipoDenunciaScreen);
