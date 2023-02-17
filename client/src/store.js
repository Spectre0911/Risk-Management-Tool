import {createStore} from "redux";

const initialState ={
    username: "Jane Arnold"
};

function reducer(state=initialState, action){
    if (action.type=== "setUser") {
        return {...state, username: action.payload}
    }
    return state;
}


export const store = createStore(reducer);