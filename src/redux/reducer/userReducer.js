import { GET_CURRENT } from "../types/userTypes"

const initState={
    currentData:{}
}

export const userReducer=( state=initState,action)=>{
       switch(action.type){
        case GET_CURRENT:
              state.currentData=action.data
             
            return {...state}
        default:
            return {...state}
       }
}