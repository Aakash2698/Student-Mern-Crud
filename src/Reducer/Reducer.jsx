import { ADD_STUDENT } from "../ActionType/ActionType";
import { UPLOAD_STUDENT } from "../ActionType/ActionType";
import { DISPLAY_STUDENT } from "../ActionType/ActionType";
import { UPDATE_STUDENT } from "../ActionType/ActionType";
import { DELETE_STUDENT } from "../ActionType/ActionType";

const initialState = {
  students: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_STUDENT:
      return {
        ...state,
        students: [...state.students, ...action.payload],
      };

    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case UPLOAD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case UPDATE_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case DELETE_STUDENT:
      return {
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
