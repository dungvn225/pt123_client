import React,{useState,useEffect, useRef} from 'react'
import className from 'classnames/bind';
import styles from './Navigation.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import { NavLink } from 'react-router-dom';
import { getCategoriesAction } from '../../redux/actions/categoriesActions';
import {useDispatch,useSelector} from 'react-redux'
import { config } from '../../config';
const cx=className.bind(styles);


export default function Navigation() {
 
    const [sticky,setSticky]=useState(false)
    const navRef=useRef();
    const  dispatch=useDispatch();
    useEffect(() => {
        dispatch(getCategoriesAction()) 
       }, [])
    const {categories}=useSelector(state=>state.categoriesReducer);
   
   useEffect(()=>{
     const nav=navRef.current;
     const rect=nav.getBoundingClientRect();
      
     const handleScroll=()=>{
      const nav=navRef.current;
      const rect=nav.getBoundingClientRect();
        if(window.scrollY>=rect.top){
          setSticky(true)
        }else{
          setSticky(false);
        }
     }
     window.addEventListener('scroll',handleScroll);
     return ()=>{
      window.removeEventListener('scroll',handleScroll);
     }
   },[])
  return (
    <div className={cx('wrapper',sticky?'sticky':'')} ref={navRef} >
      
        <div className={cx('content-wp')}>
             <div className={cx('content')}>
            
             <NavLink to={'/'} className={(nav)=>cx('wrapperItem',{active:nav.isActive})} >  Trang chủ  </NavLink>
                {categories?.map((item,index)=>{
                  return <NavigationItem key={index} item={item}/>
               })} 
                <NavLink to={config.routes.CONTACT} className={cx('wrapperItem')} >  Liên hệ  </NavLink>
             </div>

        </div>
           
    </div>
  )
}

