import { ADD_STUDENT } from "../ActionType/ActionType";
import { UPLOAD_STUDENT } from "../ActionType/ActionType";
import { DISPLAY_STUDENT } from "../ActionType/ActionType";
import { UPDATE_STUDENT } from "../ActionType/ActionType";
import { DELETE_STUDENT } from "../ActionType/ActionType";

export const getData = () => {
  return async (dispatch) => {
    const url = "http://localhost:4000/student";
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: DISPLAY_STUDENT,
      payload: data,
    });
  };
};
export const uploadData = (formData) => 
{
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
    return data
  };
};
export const insertData = (data) => {
  const value = data;
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
export const updateData = (ID, data) => {
  const value = data;
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
    console.log("Fetch data :-", data);
    dispatch({
      type: UPDATE_STUDENT,
      payload: data,
    });
  };
};
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


