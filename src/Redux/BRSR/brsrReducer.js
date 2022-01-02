import types from "./type";

const INITIAL_STATE = {};

export const brsrReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL:
      return { ...state, ...payload };
    default:
      return state;
  }
};