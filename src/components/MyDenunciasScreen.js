import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  FlatList
} from "react-native";
import BottomButtons from "./BottomButtons";
import { getDenuncias } from "../actions/denuncias";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyList from "./common/EmptyList";
import GoBackButton from "./common/GoBackButton";

class MyDenunciasScreen extends React.Component {
  componentWillMount() {
    this.props.getDenuncias();
    this.props.navigation.addListener("willFocus", () => {
      if (this.props.isAuthenticated) this.props.getDenuncias();
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GoBackButton
          navigation={this.props.navigation}
          title="Minhas Denúncias"
        />
        <FlatList
          data={this.props.denunciasUsuario}
          ListEmptyComponent={
            <EmptyList text="Você ainda não possui nenhuma denuncia cadastrada" />
          }
          renderItem={({ item }) => (
            <TouchableHighlight>
              <View>
                <View style={styles.listItens}>
                  <FontAwesomeIcon
                    icon={
                      this.props.denuncias.filter(d => d.id == item.denuncia)[0]
                        .icone
                    }
                    color={"black"}
                    size={30}
                  />
                  <View style={styles.itemName}>
                    <Text>
                      Denuncia:
                      {
                        this.props.denuncias.filter(
                          d => d.id == item.denuncia
                        )[0].descricao
                      }
                    </Text>
                    <Text>Comentário:{item.comentario}</Text>
                  </View>
                </View>
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
  denunciasUsuario: state.denunciasUsuario.denunciasUsuario,
  denuncias: state.denuncias.denuncias
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

export default connect(mapStateToProps, { getDenuncias })(MyDenunciasScreen);
