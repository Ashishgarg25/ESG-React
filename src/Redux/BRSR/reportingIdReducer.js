import types from "./type";

const INITIAL_STATE1 = {};

export const reportingIdReducer = (state = INITIAL_STATE1, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_REPORTING_ID:
      return {
        ...state,
        reportingId: payload,
      };
    default:
      return state;
  }
};
