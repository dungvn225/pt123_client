
import axios from 'axios'
import { DOMAIN, TOKEN } from '../utils/settings/config';
export const getCurrentService=()=>{
    const token=localStorage.getItem(TOKEN).slice(1,-1);   
  
    return axios({
        method:'GET',
        url:`${DOMAIN}/api/v1/user/getCurrent`,
        headers: { 'Authorization': `Bearer ${token}` } 

    })
}
export const updateUserService=(data)=>{
    const token=localStorage.getItem(TOKEN).slice(1,-1);   
  
    return axios({
        method:'PUT',
        url:`${DOMAIN}/api/v1/user/update`,
        data,
        headers: { 'Authorization': `Bearer ${token}` } 

    })
}

