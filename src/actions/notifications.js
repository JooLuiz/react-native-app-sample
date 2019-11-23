import { CHANGE_VISIBILITY, NOTIFY } from "../actions/types";

export const notify = (message, type) => (dispatch, getState) => {
  dispatch({ type: NOTIFY, payload: { message, type } });
};

export const changeVisibility = visibility => (dispatch, getState) => {
  dispatch({ type: CHANGE_VISIBILITY, payload: { visibility } });
};
