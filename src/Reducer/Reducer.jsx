import { ADD_STUDENT } from "../ActionType/ActionType";
import { UPLOAD_STUDENT } from "../ActionType/ActionType";
import { DISPLAY_STUDENT } from "../ActionType/ActionType";
import { UPDATE_STUDENT } from "../ActionType/ActionType";
import { DELETE_STUDENT } from "../ActionType/ActionType";

const initialState = {
  students:[],
  count:0
};
export default (state = initialState, action) => 
{   
  switch (action.type) 
  {
    case DISPLAY_STUDENT:
      return {
        ...state,
        students:action.payload,            
        count:action.total
      }; 
    case ADD_STUDENT:
      return {
        ...state,
        students:action.payload,        
        count:action.total
        
      }; 
    case UPLOAD_STUDENT:
      return {
        ...state,
        students:action.payload, 
        count:action.total     
      }; 

    case UPDATE_STUDENT:
      return {
        ...state,
        students:action.payload,      
        count:action.total    
      }; 

    case DELETE_STUDENT:
    return {
      students: state.students.filter(
        (student) => student._id !== action.payload),
        count:action.total        
    };

    default:
      return state;
  }
};
