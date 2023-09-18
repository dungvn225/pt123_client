import {  getNewPostService, getOutstandingPostService, getPostsLimitCurrentService, getPostsLimitService, getPostsService } from "../../services/postsServices"
import {  GET_NEW_POST, GET_OUTSTANDING_POST, GET_POSTS, GET_POSTS_LIMIT, GET_POSTS_LIMIT_CURRENT, SAVE_POST } from "../types/postsTypes";
import { loadingAction } from "./loadingAction";

export const getPostsAction=()=>{
    return async dispatch=>{
         try {
              const response= await getPostsService();
             
              if(response.data.err==0){
             return   dispatch({
                    type: GET_POSTS,
                    posts:response.data.response
                    
                })
                }else{
                 return   dispatch({
                        type: GET_POSTS,
                        msg:response.data.msg  
                        
                    })
                }
         } catch (error) {
           return error
         }
    }
}


export const getPostsLimitAction=(query)=>{
    return async dispatch=>{
         try {
                dispatch( loadingAction(true))
              const response= await getPostsLimitService(query);
            
              if(response.data.err==0){
            
                await  dispatch({
                    type: GET_POSTS_LIMIT,
                    posts:response.data.response.rows,  
                    count:response.data.response.count 
                    
                })
                    dispatch( loadingAction(false))
                }else{
                    dispatch({
                        type: GET_POSTS_LIMIT,
                        msg:response.data.msg  
                        
                    })
                }
         } catch (error) {
            return error
         }
    }
}



export const getPostsLimitCurrentAction=(query)=>{
    return async dispatch=>{
         try {
              const response= await getPostsLimitCurrentService(query);
                
              if(response.data.err==0){
             return   dispatch({
                    type: GET_POSTS_LIMIT_CURRENT,
                    posts:response.data.response.rows,  
                    count:response.data.response.count 
                    
                })
                }else{
                 return   dispatch({
                        type: GET_POSTS_LIMIT_CURRENT,
                        msg:response.data.msg  
                        
                    })
                }
         } catch (error) {
             console.log(error)
         }
    }
}


export const getNewPostAction=()=>{
    return async dispatch=>{
          try {
             const response= await getNewPostService();
           
             dispatch({
                type: GET_NEW_POST,
                data:response.data.response
             })
          } catch (error) {
           
            dispatch({
                type: GET_NEW_POST,
                data:null
             })
          }
    }
}


export const getOutstandingPostAction=()=>{
    return async dispatch=>{
          try {
             const response= await getOutstandingPostService();
           
             dispatch({
                type: GET_OUTSTANDING_POST,
                data:response.data.response
             })
          } catch (error) {
           
            dispatch({
                type: GET_OUTSTANDING_POST,
                data:null
             })
          }
    }
}

export const savePostAction=(post)=>{
    
     return {
        type:SAVE_POST,
        post
     }
}