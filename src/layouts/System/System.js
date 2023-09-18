import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './System.module.scss';
import {Navigate} from 'react-router-dom'
import { config } from '../../config';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

import { pricesAction } from "../../redux/actions/pricesActions";
import { getAreasAction } from "../../redux/actions/areasActions";
import { getNewPostAction, getPostsLimitCurrentAction } from "../../redux/actions/postsActions";
import { getProvinceAction } from "../../redux/actions/provinceActions";
import { useSelector,useDispatch } from "react-redux";
import { getCurrentAction } from "../../redux/actions/userActions";
const cx=classNames.bind(styles)
export default function System({children}) {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(pricesAction());
    dispatch(getAreasAction());
    dispatch(getNewPostAction());
    dispatch(getProvinceAction());
  }, []);
  const {isLogin} =useSelector(state=>state.authReducer);
  useEffect(()=>{
  
  isLogin &&  dispatch(getCurrentAction())
 },[])
 useEffect(()=>{
  window.scrollTo(0,0)
 })
      


  if(isLogin) return (
    <div className={cx('wrapper')}>
       <Header/>
       <div className={cx('content')}>
             <SideBar/>
             <div className={cx('outlet')}>  {children}</div>
           
       </div>
       
      
    </div>
  )


  return (
     <Navigate to={config.routes.Login} />
  )
}
