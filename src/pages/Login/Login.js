import React, { useState,useEffect } from 'react'
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import {NavLink,useNavigate} from 'react-router-dom'
import { loginAction } from '../../redux/actions/authAction';
import {useDispatch,useSelector} from 'react-redux'
import { config } from '../../config';
const cx=classNames.bind(styles);
export default function Login() {
  const navigate=useNavigate();
  const {msg,update,isLogin}=useSelector(state=>state.authReducer);
  const dispatch=useDispatch()
  const [inValidFields,setInvalidFields]=useState([])
   const [login,setLogin]=useState({
        phone:'',
        password:''
   })

   useEffect(()=>{
    msg && alert(msg);
   },[msg,update])
  
   useEffect(()=>{
    
    isLogin==true  && navigate(config.routes.Home)      
   },[isLogin,update])
  
  const onChangeLogin=(e)=>{
      const target=e.target;
      const name=target.name;
      const value=target.value;

      setLogin({...login,[name]:value})
  }
  
  const handleLogin=(e)=>{
    e.preventDefault();
    validate(login);

    if( validate(login)==0){
        dispatch(loginAction(login));
    }
  }
  const validate=(payload)=>{
      let inValids=0;
      let fields=Object.entries(payload);
      fields.forEach(element => {
              if(element[1].length==0){
                setInvalidFields(prev=>[...prev,{
                  name: element[0],
                  message: 'Bạn ko đc để trống trường này'

               }])
               inValids++;
              }
      });
      fields.forEach(element => { 
           switch(element[0]){
            case 'password':
              if(element[1].length<6){
                setInvalidFields(prev=>[...prev,{
                   name: element[0],
                   message: 'Mật khẩu tối thiểu 6 ký tự'

                }])
                inValids++;
              }
              break;
            case 'phone':
              if(!+element[1]){
                setInvalidFields(prev=>[...prev,{
                  name: element[0],
                  message: 'Số điện thoại ko hợp lệ'

               }])
               inValids++;
              }
           }
      });
      return inValids
  }
  return (
    <div className={cx('wrapper')}>
         <form className={cx('form')}>
             <div className={cx('title')}>Login </div>
             <div className={cx('form-control')}>
                <div className={cx('name')}>Phone</div>
                   <div className={cx('text')}>
                    <input name='phone' onChange={(e)=>onChangeLogin(e)} type={'text'}  value={login.phone} onFocus={()=>setInvalidFields([])}/>
                  </div>
             </div>
            {inValidFields.length>0 && inValidFields.some(i=>i.name=='phone') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='phone')?.message}</div>}


             <div className={cx('form-control')}>
                <div className={cx('name')}>Password</div>
                   <div className={cx('text')}>
                    <input name='password' onChange={(e)=>onChangeLogin(e)} type={'text'}  value={login.password} onFocus={()=>setInvalidFields([])}/>
                  </div>
             </div>
             {inValidFields.length>0 && inValidFields.some(i=>i.name=='password') && <div style={{color:'red'}}>{inValidFields.find(i=>i.name=='password')?.message}</div>}


             <button className={cx('btnLogin')}  onClick={(e)=>handleLogin(e)}> Login  </button>
             <div className={cx('action')}>
            <div  className={cx('forgot-password')}> Forgot your password ?</div>
            <NavLink to='/register'  className={cx('register')} >Register</NavLink>
           
         </div>
         
         </form> 
        
    </div>
  )
}
