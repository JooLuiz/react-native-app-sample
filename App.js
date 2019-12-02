import React from "react";
import "./src/config/StatusBarConfig";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./src/routes";
import store from "./store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
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
  faPaw,
  faSearch,
  faTimesCircle,
  faSignOutAlt,
  faBackspace
} from "@fortawesome/free-solid-svg-icons";
import { loadUser } from "./src/actions/auth";
import {
  getDenunciasUsuario,
  getAllDenuncias
} from "./src/actions/denunciasUsuario";
import { getDenuncias } from "./src/actions/denuncias";
import { getEnderecoUsuario } from "./src/actions/enderecosUsuario";
import { getTipoDenuncias } from "./src/actions/tipoDenuncias";
import Loader from "./src/components/common/Loader";
import { notify } from "./src/actions/notifications";
import Notifications from "./src/components/common/Notifications";
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
  faPaw,
  faSearch,
  faTimesCircle,
  faSignOutAlt,
  faBackspace
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
      /*TODO*/
    }
  }

  componentWillMount() {
    axios.defaults.baseURL = "http://366162b4.ngrok.io/api";
    axios.defaults.timeout = 1500;
    store.dispatch(notify("Bem Vindo ao RotaSegura App", "neutral"));
    store.dispatch(getAllDenuncias());
    store.dispatch(loadUser());
    store.dispatch(getTipoDenuncias());
    store.dispatch(getDenuncias());
    store.dispatch(getDenunciasUsuario());
    store.dispatch(getEnderecoUsuario());
    this.requestLocalionPermission();
  }

  render() {
    return (
      <PaperProvider>
        <Provider store={store}>
          <Loader />
          <Notifications />
          <AppContainer />
        </Provider>
      </PaperProvider>
    );
  }
}
