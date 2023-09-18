import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Address.module.scss";
import Select from "./Select/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublicDistrictService,
  getPublicProvinceService,
} from "../../services/provinceServices";
import ReadOnly from "../ReadOnly/ReadOnly";
const cx = classNames.bind(styles);
export default function Address({payload,setPayload,inValidFields,setInvalidFields,editPost}) {
  const [provinces, setProvinces] = useState([]);
  
  const [province, setProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const dispatch = useDispatch();
 
  const {dataEdit}= useSelector(state=>state.postsReducer);
 
  useEffect(() => {
    const fetchPublicProvinces = async () => {
      const response = await getPublicProvinceService();

      setProvinces(response.data.results);
    };
    fetchPublicProvinces();
  }, []);
 
  useEffect(()=>{
   
       
       const foundProvince=  provinces.length>0 &&  provinces.find(item=>item.province_name==dataEdit.address?.split(',')[1]) 
  
     foundProvince?setProvince(foundProvince.province_id) :setProvince('')
      
    },[provinces,dataEdit.address])
    useEffect(()=>{
      
      const foundDistrict=  districts.length>0 &&   districts.find(item=>item.district_name==dataEdit.address?.split(',')[0]) 
     
        setDistrict(foundDistrict? foundDistrict.district_id :'')
      
         
       },[districts,dataEdit.address])
 
  useEffect(() => {
  
    setDistricts([]);
     setDistrict('');
   
    const fetchPublicDistricts = async () => {
      const response = await getPublicDistrictService(province);
     
     setDistricts(response.data.results);
    };
    province!=='' &&  fetchPublicDistricts() ;
  
  
  }, [province]);
 
  useEffect(()=>{
   
  setPayload(prev=>({...prev,address: (`${
    district
      ? districts.find((item) => item.district_id == district)
          ?.district_name + ","
      : ""
  }${
    province
      ? provinces.find((item) => item.province_id == province)
          ?.province_name
      : ""
  }`)}))
  },[province, district])
  
useEffect(()=>{
    payload.address=='' && setProvince('')
},[payload.address])
  return (
    <div className={cx("wrapper")}>
    
      <h3>Địa chỉ cho thuê</h3>
      <div className={cx("address")}>
        <div className={cx("choose")}>
          <Select
            type="provinces"
            name='provinces'
            label="Tỉnh / thành phố"
            provinces={provinces}
            province={province}
            setProvince={setProvince}
            inValidFields={inValidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
            
          />
          <Select
            type="districts"
            name='districts'
            label="Quận / huyện"
            districts={districts}
            district={district}
            setDistrict={setDistrict}
            inValidFields={inValidFields}
            setInvalidFields={setInvalidFields} 
            payload={payload}
            setPayload={setPayload}
          />
        </div>
        <ReadOnly text={`${
            district
              ? districts.find((item) => item.district_id == district)
                  ?.district_name + ","
              : ""
          }  ${
            province
              ? provinces.find((item) => item.province_id == province)
                  ?.province_name
              : ""
          }`}/>
     
      </div>
    </div>
  );
}


