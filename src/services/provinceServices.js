import { DOMAIN } from '../utils/settings/config';
import axios from 'axios';
export const getProvinceService=()=>{
    return axios({
        url:`${DOMAIN}/api/v1/province`,
        method:'GET'
    })
}

export const getPublicProvinceService=()=>{
    return axios({
        url:`https://vapi.vnappmob.com/api/province`,
        method:'GET'
    })
}


export const getPublicDistrictService=(provinceId)=>{
    return axios({
        url:`https://vapi.vnappmob.com/api/province/district/${provinceId}`,
        method:'GET'
    })
}

