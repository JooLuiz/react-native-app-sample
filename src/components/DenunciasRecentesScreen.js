import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { getAllDenuncias } from "../actions/denunciasUsuario";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyList from "./common/EmptyList";
import { List } from "react-native-paper";

class DenunciasRecentesScreen extends React.Component {
  static navigationOptions = {
    title: "Denúncias Recentes"
  };

  componentWillMount() {
    this.props.getAllDenuncias();
    this.props.navigation.addListener("willFocus", () => {
      if (this.props.isAuthenticated) this.props.getAllDenuncias();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.allDenuncias.filter(t => {
            var today = new Date();
            var days = 86400000; //number of milliseconds in a day
            var fiveDaysAgo = new Date(today - days / 2);
            var dateTimeT = new Date(t.data_hora);
            if (dateTimeT > fiveDaysAgo) return t;
          })}
          ListEmptyComponent={
            <EmptyList text="Você ainda não possui nenhuma denuncia cadastrada" />
          }
          renderItem={({ item }) => (
            <View>
              <List.Item
                title={item.denuncia.descricao}
                description={item.comentario}
                left={() => (
                  <List.Icon
                    icon={() => (
                      <FontAwesomeIcon
                        icon={item.denuncia.icone}
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
  allDenuncias: state.denunciasUsuario.allDenuncias
});

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: "#ffffff"
  }
});

export default connect(mapStateToProps, { getAllDenuncias })(
  DenunciasRecentesScreen
);
