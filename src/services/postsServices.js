
import { DOMAIN, TOKEN } from '../utils/settings/config'

import axios from 'axios'

export const  getPostsService =()=>{
    return axios({
        url:`${DOMAIN}/api/v1/post/all`,
        method:'GET'
    })
}


export const  getPostsLimitService =(query)=>{
    return axios({
        url:`${DOMAIN}/api/v1/post/limit`,   
        method:'GET',
        params: query , 
       
    })
}


export const  getPostsLimitCurrentService =(query)=>{
 
    const token=localStorage.getItem(TOKEN).slice(1,-1);
    return axios({
        url:`${DOMAIN}/api/v1/post/limit-current`,   
        method:'GET',
        params: query , 
        headers: {'Authorization':`Bearer ${token}`}
       
    })
}

export const  getNewPostService =()=>{
    return axios({
        url:`${DOMAIN}/api/v1/post/newPost`,   
        method:'GET',
       
    })
}
export const  getOutstandingPostService =()=>{
    return axios({
        url:`${DOMAIN}/api/v1/post/outstandingPost`,   
        method:'GET',
       
    })
}


export const  apiUploadImages =(images)=>{
    return axios({   
        url:`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,   
        method:'POST',
        data:images
    })
}


export const  createNewPostService =(data)=>{
    const token=localStorage.getItem(TOKEN).slice(1,-1);
    return axios({
        url:`${DOMAIN}/api/v1/post/create-new`,   
        method:'POST',
        data:data,
        headers: {'Authorization':`Bearer ${token}`}
      

    })
}


export const  updatePostService =(data)=>{
    const token=localStorage.getItem(TOKEN).slice(1,-1);
      return axios({
          url:`${DOMAIN}/api/v1/post/update`,   
          method:'PUT',
          data:data,
          headers: {'Authorization':`Bearer ${token}`}
  
      })
  }
  
  
  
export const  deletePostervice =(postId)=>{
    const token=localStorage.getItem(TOKEN).slice(1,-1);
      return axios({
          url:`${DOMAIN}/api/v1/post/delete`,   
          method:'DELETE',
          params:postId,
          headers: {'Authorization':`Bearer ${token}`}
  
      })
  }
  
  