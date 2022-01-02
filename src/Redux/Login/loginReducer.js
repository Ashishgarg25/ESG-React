import { fromJS } from "immutable";

import types from "./type";

let INITIAL_STATE = fromJS({
  isAuthenticating: true,
  token: null,
});

export const loginReducer = (state = INITIAL_STATE, action) => {
  let { token } = state;
  switch (action.type) {
    case types.LOGGIN:
      return fromJS(action.payload).set("isAuthenticating", false);
    case types.SET_TOKEN:
      token = action.payload.token;
      return { ...state, token };
    case types.LOGGOUT:
      return fromJS({
        isAuthenticating: true,
        token: null,
      });
    default:
      return state;
  }
};
