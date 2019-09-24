import { combineReducers } from "redux";
import map from "./map";
import auth from "./auth";
import tipoDenuncias from "./tipoDenuncias";
import denuncias from "./denuncias";
import denunciasUsuario from "./denunciasUsuario";

export default combineReducers({
  map,
  auth,
  tipoDenuncias,
  denuncias,
  denunciasUsuario
});
