import { GET_PROVINCE } from "../types/provinceTypes"

const initState={
    provinces:[],
}

export const provinceReducer=(state=initState,action)=>{
     switch(action.type){
        case GET_PROVINCE:
            state.provinces= action.data
            
            return {...state}
        default:
            return {...state}
     }
}