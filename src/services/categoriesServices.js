import axios from "axios";
import { DOMAIN } from "../utils/settings/config";
export  const getCategoriesService=()=>axios({   
    url:`${DOMAIN}/api/v1/categories`,  
    method:'GET',
    
})