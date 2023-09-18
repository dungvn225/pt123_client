import { getPricesService } from "../../services/pricesServices";
import { GET_PRICES } from "../types/pricesTypes";

export const pricesAction=()=>{
    return async dispatch=>{
        try {
            const response =await getPricesService();
           
            dispatch({
                type: GET_PRICES,
                data:response.data.response.sort((a,b)=>a.order-b.order)
            })
        } catch (error) {
          return error
        }
    }
}




