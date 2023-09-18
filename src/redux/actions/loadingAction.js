import { LOADING } from "../types/loadingType"

export const loadingAction=(isLoading)=>{
     return {
        type: LOADING,
        isLoading
     }
}