import types from "./type";

export const UpdateField = (reportingId) => (dispatch) => {
  dispatch({
    type: types.UPDATE,
    payload: reportingId,
  });
};
