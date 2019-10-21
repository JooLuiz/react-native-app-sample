import React from "react";
import "./src/config/StatusBarConfig";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./src/routes";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCog,
  faMapMarkedAlt,
  faBars,
  faUser,
  faPlus,
  faExclamationTriangle,
  faDirections,
  faTrafficLight,
  faShareAlt,
  faSave,
  faFrown,
  faMapMarkerAlt,
  faCheck,
  faUniversalAccess,
  faMeteor,
  faUserNinja,
  faCannabis,
  faSkull,
  faBolt,
  faSnowflake,
  faCloudShowersHeavy,
  faCloudMeatball,
  faCarCrash,
  faTools,
  faRadiation,
  faPaw
} from "@fortawesome/free-solid-svg-icons";
import { loadUser } from "./src/actions/auth";
import {
  getDenunciasUsuario,
  getAllDenuncias
} from "./src/actions/denunciasUsuario";
import { getDenuncias } from "./src/actions/denuncias";
import { getEnderecoUsuario } from "./src/actions/enderecosUsuario";
import Loader from "./src/components/common/Loader";
import { PermissionsAndroid } from "react-native";

library.add(
  fab,
  faCog,
  faMapMarkedAlt,
  faBars,
  faUser,
  faPlus,
  faExclamationTriangle,
  faDirections,
  faTrafficLight,
  faShareAlt,
  faSave,
  faFrown,
  faMapMarkerAlt,
  faCheck,
  faUniversalAccess,
  faMeteor,
  faUserNinja,
  faCannabis,
  faSkull,
  faBolt,
  faSnowflake,
  faCloudShowersHeavy,
  faCloudMeatball,
  faCarCrash,
  faTools,
  faRadiation,
  faPaw
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  async requestLocalionPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Rota Segura precisa da sua localização",
          message:
            "Podemos acessar sua localização? " +
            "Isso tornará sua experiência melhor",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Acesso garantido");
      } else {
        console.log("Acesso negado");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  componentWillMount() {
    axios.defaults.baseURL = "http://6446f880.ngrok.io/api";
    axios.defaults.timeout = 1500;
    store.dispatch(loadUser());
    store.dispatch(getDenuncias());
    store.dispatch(getAllDenuncias());
    store.dispatch(getDenunciasUsuario());
    store.dispatch(getEnderecoUsuario());
    this.requestLocalionPermission();
  }

  render() {
    return (
      <Provider store={store}>
        <Loader />
        <AppContainer />
      </Provider>
    );
  }
}
