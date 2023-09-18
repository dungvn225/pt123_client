import React from 'react'
import classNames from 'classnames/bind'
import styles from './ReadOnly.module.scss'
const cx=classNames.bind(styles)
export default function ReadOnly({text,label}) {
  return (
   <div className={cx('wrapper')}>
     <div className={cx('label')}>{label}</div>
     <div className={cx('text')}>{text}</div>
   </div>
  )
}
