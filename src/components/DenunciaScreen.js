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
import { List } from "react-native-paper";

class DenunciaScreen extends React.Component {
  componentWillMount() {
    this.props.getDenuncias();
  }

  setDenunciaAndGo(tipoDenuncia) {
    this.props.setCurrentDenuncia(tipoDenuncia);
    this.props.navigation.navigate("DenunciasUsuario");
  }

  render() {
    return (
      <View style={styles.container}>
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
            <View>
              <List.Item
                title={item.descricao}
                onPress={() => this.setDenunciaAndGo(item)}
                left={() => (
                  <List.Icon
                    icon={() => (
                      <FontAwesomeIcon
                        icon={item.icone}
                        color={"black"}
                        size={30}
                      />
                    )}
                  />
                )}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: "#ffffff"
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentTipoDenuncia: state.tipoDenuncias.currentTipoDenuncia,
  denuncias: state.denuncias.denuncias
});

export default connect(mapStateToProps, { getDenuncias, setCurrentDenuncia })(
  DenunciaScreen
);
