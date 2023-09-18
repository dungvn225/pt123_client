import React from 'react'
import { ColorRing } from  'react-loader-spinner'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind';
import  styles from './Loading.module.scss'
const cx=classNames.bind(styles)
export default function Loading() {
  const {isLoading}=useSelector(state=>state.loadingReducer);
   if(isLoading)
  return (
   <div className={cx('wrapper')}>
     <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={['gray', 'gray', 'gray', 'gray', 'gray']} 
    
  />
   </div>
  )
  else{
   return ''
  }
}
