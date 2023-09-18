import { getCurrentService } from "../../services/userSevices";
import { LOGOUT } from "../types/authTypes";
import { GET_CURRENT } from "../types/userTypes";

export const getCurrentAction=()=>{
    return async dispatch=>{
        try {
             const response=await getCurrentService();
            
             if(response.data.err==0){
               
                dispatch({
                    type: GET_CURRENT,
                    data:response.data.response
                })
             }else{
             
                dispatch({
                    type: LOGOUT,
                  
                })
             }
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGOUT,
              
            })
        }
    }
}