import { TESTE } from "../actions/types";

const initialState = {
  msg: "",
  status: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TESTE:
      return {
        msg: action.payload,
        status: "funcionou"
      };
    default:
      return state;
  }
}
