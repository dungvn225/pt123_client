import React from 'react'
import style from './ContactItem.module.scss';
import classNames from 'classnames/bind';
const cx=classNames.bind(style);
export default function ContactItem({item}) {
  return (
    <div className={cx('wrapper')}>
                  <div className={cx('title')}>{item.title}</div>
                  <a  href= {`tel:${item.phone}`} className={cx('phone')}>Điện thoại:{item.phone}</a>
                  <a  href={`https://zalo.me/${item.zalo}`} className={cx('zalo')}>Zalo: {item.zalo}</a>
     </div>
  )
}
