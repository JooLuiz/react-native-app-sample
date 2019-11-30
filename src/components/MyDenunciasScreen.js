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
import { List } from "react-native-paper";

class MyDenunciasScreen extends React.Component {
  static navigationOptions = {
    title: "Minhas Denúncias"
  };

  componentWillMount() {
    this.props.getDenuncias();
    this.props.navigation.addListener("willFocus", () => {
      if (this.props.isAuthenticated) this.props.getDenuncias();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.denunciasUsuario}
          ListEmptyComponent={
            <EmptyList text="Você ainda não possui nenhuma denuncia cadastrada" />
          }
          renderItem={({ item }) => (
            <View>
              <List.Item
                title={
                  this.props.denuncias.filter(d => d.id == item.denuncia)[0]
                    .descricao
                }
                description={item.comentario}
                left={() => (
                  <List.Icon
                    icon={() => (
                      <FontAwesomeIcon
                        icon={
                          this.props.denuncias.filter(
                            d => d.id == item.denuncia
                          )[0].icone
                        }
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  denunciasUsuario: state.denunciasUsuario.denunciasUsuario,
  denuncias: state.denuncias.denuncias
});

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: "#ffffff"
  }
});

export default connect(mapStateToProps, { getDenuncias })(MyDenunciasScreen);
