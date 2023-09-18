
import axios from 'axios';
import { DOMAIN } from '../utils/settings/config';
export  const registerService=(data)=>axios({   
    url:`${DOMAIN}/api/v1/auth/register`,  
    method:'POST',
    data
})


export  const loginService=(data)=>axios({   
    url:`${DOMAIN}/api/v1/auth/login`,  
    method:'POST',
    data,
    
})


 