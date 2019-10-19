import React from "react";
import './src/config/StatusBarConfig';
import { createAppContainer } from "react-navigation";
import AppNavigator from "./src/routes";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCog, faMapMarkedAlt, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { loadUser } from "./src/actions/auth";
import {
  getDenunciasUsuario,
  getAllDenuncias
} from "./src/actions/denunciasUsuario";
import { getDenuncias } from "./src/actions/denuncias";

library.add(fab, faCog, faMapMarkedAlt, faBars, faUser);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    axios.defaults.baseURL = "http://500d882f.ngrok.io/api";
    axios.defaults.timeout = 1500;
    store.dispatch(loadUser());
    store.dispatch(getAllDenuncias());
    store.dispatch(getDenunciasUsuario());
    store.dispatch(getDenuncias());
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
