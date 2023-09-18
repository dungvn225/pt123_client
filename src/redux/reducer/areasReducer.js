import { GET_AREAS } from "../types/areasTypes"

const initState={
      areas:[],
}

export const areasReducer=(state=initState,action)=>{
    switch(action.type){
        case GET_AREAS:
            state.areas=action.data;
            return {...state}
        default:
            return {...state}
    }
}