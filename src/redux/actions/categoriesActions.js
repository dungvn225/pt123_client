import { getCategoriesService } from "../../services/categoriesServices"
import { GET_CATEGORIES } from "../types/categoriesTypes";

export const getCategoriesAction=()=>{
     return async dispatch=>{
         try {
            const response= await getCategoriesService();
          
            dispatch({
                type: GET_CATEGORIES,
                data: response.data.response
            })
         } catch (error) {
             return error
         }
     }
}