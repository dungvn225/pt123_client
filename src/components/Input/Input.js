import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Input.module.scss';
const cx=classNames.bind(styles);
export default function Input({label='',unit='',payload='', setPayload=()=>{},type='',inValidFields=[],setInvalidFields=()=>[],name='',...props}) {
   
   const handleChange=(e)=>{
      let name=e.target.name;
      let value=e.target.value;
     

    setPayload(prev=>({...prev,[name]:value}))
   }
   
   const handleError=()=>{
      let msgError='';
      msgError=  (name &&  inValidFields.some(item=>item.name==name) ) &&  inValidFields.find(item=>item.name==name)?.message;
                 
     return msgError
    }
  return (
    <>
    <div className={cx('wrapper')}>
        <label >{label}</label>
        <div className={cx('input-wp')}>
           <input 
           type={(type=='priceNumber' || type=='areaNumber')?'number': 'text'} 
            
            name={type} value={payload[type]}  
            onChange={(e)=>handleChange(e)}
            onFocus={()=>setInvalidFields([])}
            /> 
       {unit?<span>{unit}</span> :''}  </div>
    </div> 
    <small>{handleError()}</small> 
    </>
  )
}
