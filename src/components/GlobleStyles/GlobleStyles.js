import React from 'react'
import styles from './GlobleStyles.module.scss';
import className from 'classnames/bind';
const cx=className.bind(styles);

export default function GlobleStyles({children}) {
  return ( 
    <div className={cx('wrapper')}>{ children}</div>

  )
}
