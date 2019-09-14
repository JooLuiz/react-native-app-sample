import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS, 
    REGISTER_FAIL
} from "../actions/types";
import {AsyncStorage} from "react-native";

_storeData = async token => {
    try{
        await AsyncStorage.setItem('token', token);
    }
    catch(err){
        console.error(err);
    }
};

_retrieveData = async () => {
    try{
        var valor = await AsyncStorage.getItem('token');
        return(valor);
    }
    catch(err){
        console.error(err);
        return(null);
    }

}

_removeData = async () => {
    try {
        await AsyncStorage.removeItem('token');
    }
    catch (err) {
        console.error(err);
    }
};

const initialState = {
    token: _retrieveData(),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            _storeData(action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case LOGIN_FAIL:
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
            return(state);
    }
}