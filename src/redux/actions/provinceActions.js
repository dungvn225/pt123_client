import { getProvinceService,  } from "../../services/provinceServices";
import { GET_PROVINCE,  } from "../types/provinceTypes";

export const getProvinceAction=()=>{
    return async dispatch=>{
         try {
             const response= await getProvinceService();
            
             dispatch({
                type: GET_PROVINCE,
                data: response.data.response  
            })
         } catch (error) {
           return error
         }
    }
}

