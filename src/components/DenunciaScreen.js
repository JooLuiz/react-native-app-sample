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
import { getDenuncias, setCurrentDenuncia } from "../actions/denuncias";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyList from "./common/EmptyList";
import GoBackButton from "./common/GoBackButton";

class DenunciaScreen extends React.Component {
  componentWillMount() {
    this.props.getDenuncias();
  }

  setDenunciaAndGo(tipoDenuncia) {
    this.props.setCurrentDenuncia(tipoDenuncia);
    this.props.navigation.navigate("DenunciasUsuario");
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GoBackButton
          navigation={this.props.navigation}
          title="Categoria da Denúncia"
        />
        <FlatList
          data={this.props.denuncias.filter(
            d => d.tipo_denuncia == this.props.currentTipoDenuncia.id
          )}
          ListEmptyComponent={
            <EmptyList text="Ainda não existem Denúncias Cadastradas para esse Tipo de Denúncia." />
          }
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.setDenunciaAndGo(item)}>
              <View>
                <View style={styles.listItens}>
                  <FontAwesomeIcon
                    icon={item.icone}
                    color={"black"}
                    size={30}
                  />
                  <View style={styles.itemName}>
                    <Text>{item.descricao}</Text>
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentTipoDenuncia: state.tipoDenuncias.currentTipoDenuncia,
  denuncias: state.denuncias.denuncias
});

export default connect(
  mapStateToProps,
  { getDenuncias, setCurrentDenuncia }
)(DenunciaScreen);
