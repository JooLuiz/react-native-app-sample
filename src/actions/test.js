import { TESTE } from "./types";

export const agoraVai = msg => (dispatch, getState) => {
  dispatch({
    type: TESTE,
    payload: msg
  });
};
