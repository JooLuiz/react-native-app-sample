import axios from 'axios';
import {LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL} from "./types";

export const login = (payload) => dispatch => {
    axios
        .post(`/auth/login/`, payload)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            console.warn(error)
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

export const register = (payload) => dispatch => {
    axios
        .post(`/auth/register/`, payload)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            console.warn(error)
            dispatch({
                type: REGISTER_FAIL
            });
        });
}
