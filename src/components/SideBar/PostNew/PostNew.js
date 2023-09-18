import React from 'react'
import classNames from 'classnames/bind'
import styles from './PostNew.module.scss';
import PostNewItem from './PostNewItem/PostNewItem';
const cx=classNames.bind(styles);
export default function PostNew({data,title}) {
  
  return (
    <div className={cx('wrapper')}>
        <h3>{title}</h3>
        <div className={cx('content')}>
        {data?.length>0 && data?.map((item,index)=>{
             return < PostNewItem item={item} key={index}/>
        })}
      </div>
    </div>
  )
}
