import { GET_PRICES } from "../types/pricesTypes"


const initState={
    prices:[]
}
export const pricesReducer=(state=initState,action)=>{
     switch(action.type){
        case GET_PRICES:
            state.prices=action.data;
            return {...state}
        default:
            return {...state}
     }
}