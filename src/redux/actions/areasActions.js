import { getAreasService } from "../../services/areasServices"
import { GET_AREAS } from "../types/areasTypes";

export const getAreasAction=()=>{
     return async dispatch=>{
         try {
            const response= await getAreasService();
         
            dispatch({
                type: GET_AREAS,
                data:response.data.response.sort((a,b)=>a.order - b.order)
            })
         } catch (error) {
          return error
         }
     }
}