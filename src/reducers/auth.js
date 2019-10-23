import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS
} from "../actions/types";
import { AsyncStorage } from "react-native";

_storeData = async token => {
  try {
    await AsyncStorage.setItem("tokenRotaSegura", token);
  } catch (err) {
    console.error(err);
  }
};

export const _retrieveData = async () => {
  try {
    const valor = await AsyncStorage.getItem("tokenRotaSegura");
    return valor;
  } catch (err) {
    console.warn(err);
    return null;
  }
};

_removeData = async () => {
  try {
    await AsyncStorage.removeItem("tokenRotaSegura");
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  token: _retrieveData(),
  isAuthenticated: false,
  isLoading: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      _storeData(action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      _removeData();
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
}
