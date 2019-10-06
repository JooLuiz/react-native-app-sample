import { combineReducers } from "redux";
import map from "./map";
import auth from "./auth";
import tipoDenuncias from "./tipoDenuncias";
import denuncias from "./denuncias";
import denunciasUsuario from "./denunciasUsuario";
import enderecosUsuario from "./enderecosUsuario";
import loader from "./loader";

export default combineReducers({
  map,
  auth,
  tipoDenuncias,
  denuncias,
  denunciasUsuario,
  enderecosUsuario,
  loader
});
