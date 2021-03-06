import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { getDenuncias } from "../actions/denuncias";
import { getDenunciasUsuario } from "../actions/denunciasUsuario";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyList from "./common/EmptyList";
import { List } from "react-native-paper";

class MyDenunciasScreen extends React.Component {
  static navigationOptions = {
    title: "Minhas Denúncias"
  };

  componentWillMount() {
    this.props.getDenuncias();
    this.props.getDenunciasUsuario();
    this.props.navigation.addListener("willFocus", () => {
      if (this.props.isAuthenticated) this.props.getDenunciasUsuario();
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
                right={() => (
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    {new Date(item.data_hora).toLocaleDateString()}
                  </Text>
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

export default connect(mapStateToProps, { getDenuncias, getDenunciasUsuario })(
  MyDenunciasScreen
);
