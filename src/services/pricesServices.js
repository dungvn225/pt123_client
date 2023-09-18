import axios from "axios"
import { DOMAIN } from "../utils/settings/config"

export const getPricesService=()=>{
    return axios({
        url:`${DOMAIN}/api/v1/prices/all`,
        method:'GET'
    })
}