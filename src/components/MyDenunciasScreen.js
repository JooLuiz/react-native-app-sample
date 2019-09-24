import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Strong
} from "react-native";
import BottomButtons from "./BottomButtons";

const voltar = "<-";
class MyDenunciasScreen extends React.Component {
  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>{voltar}</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.props.denunciasUsuario}
          ListEmptyComponent={
            <View style={styles.listItem}>
              <Text>Você ainda não realizou nenhuma denúncia</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableHighlight>
              <View style={styles.listItem}>
                <Text>
                  Denuncia:
                  {
                    this.props.denuncias.filter(d => d.id == item.denuncia)[0]
                      .descricao
                  }
                </Text>
                <Text>Comentário:{item.comentario}</Text>
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
  listItem: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5
  },
  header: {
    height: Dimensions.get("window").height * 0.04,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5
  },
  backButton: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.2
  }
});

export default connect(
  mapStateToProps,
  null
)(MyDenunciasScreen);
