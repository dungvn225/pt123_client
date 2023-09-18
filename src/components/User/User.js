import React from 'react'
import classNames from 'classnames/bind'
import styles from './User.module.scss';
import { images } from '../../assets/images';
import { generateCode } from '../../utils/common/generateCode';
const cx=classNames.bind(styles);
export default function User({currentData}) {

  return (
    <div className={cx('wrapper')}>
         <img src={currentData?.avatar || images.avatar} alt='avatar' className={cx('avatar')}/>
         <div className={cx('info')}> 
             <div className={cx('name')}> xin chào <span >{currentData?.name} </span> </div>
             <div className={cx('code')}> Mã tk: {currentData?.id && generateCode(currentData?.id)}</div>
         </div>
    </div>
  )
}
