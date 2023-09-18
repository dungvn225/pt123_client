import React ,{useEffect, useState,useRef} from 'react'
import styles from './Register.module.scss'
import classNames from 'classnames/bind'
import {NavLink} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { registerAction } from '../../redux/actions/authAction'
import {useNavigate} from 'react-router-dom'
import { config } from '../../config'
const cx=classNames.bind(styles)
export default function Register() {
   const navigate=useNavigate();
   const [inValidFields,setInvalidFields]=useState([])
   const  [register,setRegister]=useState({
      name: '',
      phone:'',
      zalo:'',
      password:'',
      passwordConfirm:''
   })
   
  const dispatch=useDispatch();
  const {token,msg,isRegister,update}=useSelector(state=>state.authReducer);
   const [status,setStatus]=useState(false);
  const onChangeRegister=(e)=>{
     const target=e.target;
     const name= target.name;
     const value=target.value

     setRegister({...register,[name]:value});
   
  }
 

  



 useEffect(()=>{
        isRegister && navigate(config.routes.Login)   
 },[isRegister,update])  
 
 useEffect(()=>{
      msg &&  alert(msg) 
},[msg,update])  
 

  const validate=(payload)=>{
         let invalids=0;
         const fields=Object.entries(payload);  
        
        let password=''
         fields.forEach(element => {
              if(element[1]==''){
               setInvalidFields(prev=>[...prev,{
                    name: element[0],
                    message: 'Bạn ko đc để trống trường này.'
               }])
               invalids++;
              }
         });

         fields.forEach(element => {
             switch(element[0]){
               case 'password':
                  password=element[1];
               if(element[1].length<6){
                  setInvalidFields(prev=>[...prev,{
                     name: element[0],
                     message: 'Mật khẩu phải tối thiểu 6 ký tự.'
                }])
                invalids++;
               }
               break;
               case 'passwordConfirm':
                   if(element[1]!==password){
                     setInvalidFields(prev=>[...prev,{
                        name: element[0],
                        message: 'Mật khẩu ko khớp.'
                   }])
                   invalids++;
                   }
                   break;
               case 'phone':
                 if(!+element[1]){  
                  setInvalidFields(prev=>[...prev,{
                     name: element[0],
                     message: 'Số điện thoại ko hợp lệ.'
                }])
                invalids++;
                 }
               break;
               default:
                  break;
             }
       });
       return invalids
  }
    
  const handleRegister=(e)=>{
   e.preventDefault();
   const  {name,phone,password,passwordConfirm,zalo}=register;
   const data1={
      name,
      phone,
      password,
      passwordConfirm,
      zalo
   }
  

    
   
  
    if( validate(data1)==0){
      dispatch(registerAction(data1)) 
    }
    
  }
  return (
    <div className={cx('wrapper')}>
         <form className={cx('form')}>
             <div className={cx('title')}>Register </div>
             <div className={cx('form-control')}>
                <div className={cx('name')}>name</div>
                   <div className={cx('text')}>
                    <input type='text'  name='name'  onChange={(e)=>onChangeRegister(e)} value={register.name}  onFocus={()=>setInvalidFields([]) }/>
                  </div>
             </div>
             {inValidFields.length>0 && inValidFields.some(i=>i.name=='name') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='name')?.message} </div>}

            
             <div className={cx('form-control')}>
                <div className={cx('name')}>Phone</div>
                   <div className={cx('text')}>
                    <input type='phone' name='phone'  onChange={(e)=>onChangeRegister(e)} value={register.phone} onFocus={()=>setInvalidFields([]) }/>
                  </div>
             </div>
             {inValidFields.length>0 && inValidFields.some(i=>i.name=='phone') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='phone')?.message} </div>}


             <div className={cx('form-control')}>
                <div className={cx('name')}>Password</div>
                   <div className={cx('text')}>
                    <input type='password' name='password'   onChange={(e)=>onChangeRegister(e)} value={register.password} onFocus={()=>setInvalidFields([]) }/>
                  </div>
             </div>
             {inValidFields.length>0 && inValidFields.some(i=>i.name=='password') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='password')?.message} </div>}

            

             <div className={cx('form-control')}>
                <div className={cx('name')}>Password confirm</div>
                   <div className={cx('text')}  >
                    <input type='password'  name='passwordConfirm'  onChange={(e)=>onChangeRegister(e)} value={register.passwordConfirm} onFocus={()=>setInvalidFields([]) }/>
                  </div>
             </div>
             {inValidFields.length>0 && inValidFields.some(i=>i.name=='passwordConfirm') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='passwordConfirm')?.message} </div>}

             
             <div className={cx('form-control')}>
                <div className={cx('zalo')}>zalo</div>
                   <div className={cx('text')}  >
                    <input type='text'  name='zalo'  onChange={(e)=>onChangeRegister(e)} value={register.zalo} onFocus={()=>setInvalidFields([]) }/>
                  </div>
             </div>
             {inValidFields.length>0 && inValidFields.some(i=>i.name=='zalo') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='zalo')?.message} </div>}



             <div className={cx('form-control')}>
                <div className={cx('zalo')}>{}</div>
                  
             </div>


            
             <button className={cx('btnRegister')} onClick={(e)=>handleRegister(e)}>Register  </button>
             <div className={cx('action')}>
            <div  className={cx('text-question')}> Do you have an account ? <NavLink  to='/login' className={cx('login')}> Login</NavLink> </div>
           
         </div>
         </form> 
        
    </div>
  )
}
