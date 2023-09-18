import React from 'react'
import styles from './NavigationItem.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { formatVietnamersToString } from '../../../utils/settings/config';
const cx=classNames.bind(styles);

export default function MenuItem({item}) {
  return (
   
         <NavLink to={'/'+formatVietnamersToString(item?.value)} className={(nav)=>cx('wrapper',{active:nav.isActive})} >  {item?.value}   </NavLink>
  
  )
}
 