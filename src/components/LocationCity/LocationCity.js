import React from 'react'
import classNames from 'classnames/bind'
import styles from './LocationCity.module.scss'
import LocationItem from '../LocationItem/LocationItem';

import { images } from '../../assets/images';
const cx=classNames.bind(styles);


const  LOCATIONS=[
  {
    img: images.location_hcm,
    name:'Phòng trọ Hồ Chí Minh',
    provinceCode:'CHHO'
  },
  {
    img: images.location_hn,
    name:'Phòng trọ Hà Nội',
    provinceCode:'NIAH'
  },
  {
    img: images.location_dn,
    name:'Phòng trọ Đà Nẵng',
    provinceCode:'NGND'
  }
]
export default function LocationCity() {
  return (
    <div className={cx('wrapper')} >
      
        {LOCATIONS.map((item,index)=>{
             return <LocationItem item={item}  key={index}/>
        })}
    </div>
  )
}


