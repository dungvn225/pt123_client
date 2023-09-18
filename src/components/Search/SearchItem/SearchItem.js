import React from 'react'
import classNames from 'classnames/bind'
import styles from './SearchItem.module.scss';

const cx=classNames.bind(styles)
export default function SearchItem({item,handleModal,queries}) {
  
    
  return (                                     
    <div className={cx('wrapper')} onClick={()=>{handleModal(true,item)}}>
      <div className={cx('left')}>
        <div className={cx('icon-before')}>{item.iconBefore}</div>
       <div className={cx('text')}> { queries[item.name]? <span style={{fontWeight:'bold'}}> {queries[item.name]} </span>: item.text} </div> 
      </div>
      <div className={cx('icon-after')}>{item.iconAfter}</div>
      </div>
  )
}


