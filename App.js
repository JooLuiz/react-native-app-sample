import React from "react";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./src/routes";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    axios.defaults.baseURL = 'http://cce069d6.ngrok.io/api';
    axios.defaults.timeout = 1500;
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
