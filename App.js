import React from "react";
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
  faSave
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
  faSave
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentWillMount() {
    axios.defaults.baseURL = "http://b07a9176.ngrok.io/api";
    axios.defaults.timeout = 1500;
    store.dispatch(loadUser());
    store.dispatch(getDenuncias());
    store.dispatch(getAllDenuncias());
    store.dispatch(getDenunciasUsuario());
    store.dispatch(getEnderecoUsuario());
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
