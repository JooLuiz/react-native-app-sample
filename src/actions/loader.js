import { LOADING, LOADED } from "../actions/types";

export const loading = () => dispatch => {
  dispatch({ type: LOADING });
};

export const loaded = () => (dispatch, getState) => {
  dispatch({ type: LOADED });
};
