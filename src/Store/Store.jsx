import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import Reducer from "../Reducer/index"
export default function configureStore() 
{
    return createStore(Reducer, {}, applyMiddleware(thunk));
}






