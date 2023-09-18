import { GET_CATEGORIES } from "../types/categoriesTypes"

const initState={
    categories:[]
}

export const categoriesReducer=(state=initState,action)=>{
    switch(action.type){
        case GET_CATEGORIES:
            state.categories=action.data
            return {...state}
        default: 
            return {...state}
    }
}