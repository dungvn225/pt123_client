import React,{memo} from "react";
import classNames from "classnames/bind";
import styles from "./Select.module.scss";
const cx = classNames.bind(styles);
 function Select({
 
  provinces,
  label,
  province,
  setProvince,
  districts,
  district,
  setDistrict,
  type,
  className=false,
  options,
  
  inValidFields,
  setInvalidFields,
  name,
  payload,
  setPayload,
 
  categories
}) {

                      
   
  
   
   
  const handleChange = (e) => {
     const value=e.target.value  
     
     
    type == "provinces"? setProvince(value):
     type =='districts'? setDistrict(value) :
     type=='category' ?  setPayload(prev=>({...prev,categoryCode:value,category:categories.find(item=>item.code==value)?.value})):
     setPayload(prev=>({...prev,target:value}))
    
    
   
   

  };
   
 
  const handleError=()=>{
    let msgError='';
    msgError=  (name &&  inValidFields.some(item=>item.name==name) ) ?  inValidFields.find(item=>item.name==name)?.message:
              ( inValidFields.some(item=>item.name=='categoryCode') && name=='category') &&  inValidFields.find(item=>item.name=='categoryCode')?.message 
        
              
   return msgError
  }
 
  return (
    <div className={cx("wrapper",[className])}>
      <h4>{label}</h4>
      <select
      
        value={
          type == "provinces"? province:
          type=='districts'?district:
          type=='target'?payload.target: payload.categoryCode 
         
        }
        onChange={(e) => handleChange(e)}
        onFocus={()=>setInvalidFields([])} 
      >
        <option value={""}>{'--'+label}</option>
        {type == "provinces" &&
          provinces?.map((item, index) => {
            return (
              <option key={index} value={ item.province_id  }>
                {item.province_name}
              </option>
            );
          })}
        {type == "districts" &&
          districts?.map((item, index) => {
            return (
              <option key={index} value={ item.district_id}>
                {item.district_name}
              </option>
            );
          })}
         {
         type=='category' &&  categories?.map((item,index)=>{  
           
            return <option value={ item.code} key={index}>{ item.value}</option>
           })
         }
           {
        type=='target' &&  options?.map((item,index)=>{
            return <option value={ item.value} key={index}>{item.value}</option>
           })
         }
      </select> <br/>
      <small> { handleError()} </small>
    </div>
  );
}

export default memo(Select)