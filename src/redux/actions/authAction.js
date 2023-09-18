import {  loginService, registerService } from "../../services/auth"
import {  LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authTypes";

export const registerAction= (data)=>{
 
     return async dispatch=>{
      const response= await registerService(data);
         console.log(response)
        try { 
          
             
              if(response?.data.err==0){
               
                dispatch({
                  type:REGISTER_SUCCESS,
                  data:response.data.token,
              
                })
                   
              }else{
              
                dispatch({
                  type:REGISTER_FAIL,
                  msg:response.data.msg,
                
                })
              }
           
           
        } catch (error) {
           return error
        }
     }
}


export const loginAction=(data)=>{
    return async dispatch=>{
        try {
          const response= await loginService(data);
        
          if(response?.data?.err==0){
         
              dispatch({
                type: LOGIN_SUCCESS,
                data: response.data.token   
              })
          }else{
          
            dispatch({
              type: LOGIN_FAIL,
              msg: response.data.msg
            })
          }
        } catch (error) {
          console.log(error)
        }
    }
}
