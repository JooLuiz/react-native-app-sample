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
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { loadUser } from "./src/actions/auth";
import {
  getDenunciasUsuario,
  getAllDenuncias
} from "./src/actions/denunciasUsuario";
import { getDenuncias } from "./src/actions/denuncias";
import { getEnderecoUsuario } from "./src/actions/enderecosUsuario";
import Loader from "./src/components/common/Loader";

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
  faSearch
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentWillMount() {
    axios.defaults.baseURL = "http://d94a6aa1.ngrok.io/api";
    axios.defaults.timeout = 1500;
    store.dispatch(loadUser());
    store.dispatch(getDenuncias());
    store.dispatch(getAllDenuncias());
    store.dispatch(getDenunciasUsuario());
    store.dispatch(getEnderecoUsuario());
  }

  render() {
    return (
      <PaperProvider>
        <Provider store={store}>
          <Loader />
          <AppContainer />
        </Provider>
      </PaperProvider>
    );
  }
}
