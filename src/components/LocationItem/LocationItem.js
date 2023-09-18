import React from 'react'
import styles from './LocationItem.module.scss';
import classNames from 'classnames/bind';
import {createSearchParams, useNavigate} from 'react-router-dom'
import { config } from '../../config';
const cx=classNames.bind(styles)
export default function LocationItem({item}) {
  const navigate=useNavigate();
   const {provinceCode}=item;
   const handleOnClick=()=>{
      const titleSearch=`cho thuê ${item.name},Phòng trọ giá rẻ`
    navigate({
      pathname: config.routes.SEARCH_DETAIL, 
      search: createSearchParams({provinceCode}).toString() 
  },{state: {titleSearch}});
   }
  return (
    <div className={cx('wrapper')} onClick={()=>handleOnClick()}>
           <div className={cx('img')} style={{background:`url(${item.img})  no-repeat center / cover`}}> </div>
           <div className={cx('text')}> {item.name}</div>
    </div>
  )
}
