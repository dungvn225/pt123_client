import { LOADING } from "../types/loadingType"

const initState={
    isLoading:false
}

export const loadingReducer=(state=initState,action)=>{
    switch(action.type){
        case LOADING:
            state.isLoading=action.isLoading;
            return {...state}
        default:
            return {...state}
    }
}