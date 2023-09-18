
import axios from 'axios'
import { DOMAIN } from '../utils/settings/config'
export const getAreasService=()=>{
    return axios({
         url:`${DOMAIN}/api/v1/areas/all`,
         method:'GET'
    })
}