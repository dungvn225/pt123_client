import React from 'react'
import styles from './SliderCustom.module.scss';
import classNames from 'classnames/bind';

import Slider from "react-slick";
const cx=classNames.bind(styles);
export default function SliderCustom({images}) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
      <div className={cx('wrapper')}>
    <Slider {...settings} > 
       {images.length>0 && images.map((item,index)=>{
        return  <div className={cx('slider')} key={index}> 
               <div style={{height:'100%',background:`url(${item}) no-repeat center/contain`}}>fff </div>
        </div> 
       })}
    </Slider>
    </div>
  );
}
