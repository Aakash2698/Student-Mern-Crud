import { ADD_STUDENT } from "../ActionType/ActionType";
import { UPLOAD_STUDENT } from "../ActionType/ActionType";
import { DISPLAY_STUDENT } from "../ActionType/ActionType";
import { UPDATE_STUDENT } from "../ActionType/ActionType";
import { DELETE_STUDENT } from "../ActionType/ActionType";

// GET DATA //
export const getData = (key, skip, limit) => {
  return async (dispatch) => {
    let url = "http://localhost:4000/student/list/" + skip + "/" + limit;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(key),
    });
    const data = await response.json();
    console.log("Action", data.result);
    dispatch({
      type: DISPLAY_STUDENT,
      payload: data.result,
      total: data.count,
    });
  };
};

// UPLOAD IMAGE //
export const uploadData = (formData) => {
  return async (dispatch) => {
    const url = "http://localhost:4000/student/upload";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    dispatch({
      type: UPLOAD_STUDENT,
      payload: data,
    });
    return data;
  };
};
// INSERT STUDENT //
export const insertData = (value) => {
  return async (dispatch) => {
    const url = "http://localhost:4000/student";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();
    dispatch({
      type: ADD_STUDENT,
      payload: data,
    });
  };
};
// UPDATE STUDENT //
export const updateData = (ID, value) => {
  return async (dispatch) => {
    const url = "http://localhost:4000/student/" + ID;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();
    dispatch({
      type: UPDATE_STUDENT,
      payload: data,
    });
  };
};
// DELETE STUDENT //
export const deleteData = (ID) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_STUDENT,
      payload: ID,
    });
    const url = "http://localhost:4000/student/" + ID;
    await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
};
