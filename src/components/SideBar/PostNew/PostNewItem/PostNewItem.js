import React from 'react'
import classNames from 'classnames/bind'
import styles from './PostNewItem.module.scss';
import moment from 'moment'
import { getTime } from '../../../../utils/common/generateDate';
import { formatVietnamersToString } from '../../../../utils/settings/config';
import {useNavigate} from 'react-router-dom'
const cx=classNames.bind(styles);
export default function PostNewItem({item}) {
    const navigate=useNavigate();
    const images=item?.images?.image && JSON.parse(item.images.image)
  
  return (
    <div className={cx('wrapper')}>
        <div className={cx('img')} style={{background:`url(${images[0]}) no-repeat center/cover`}} onClick={()=>{
                navigate(`/chi-tiet/${formatVietnamersToString(item.title)}/${item.id}`)
             }}> </div>
        <div className={cx('content')}>
              <div className={cx('title')} onClick={()=>{
                navigate(`/chi-tiet/${formatVietnamersToString(item.title)}/${item.id}`)
             }}> {item.title}</div>
              <div className={cx('info')}> 
                <div className={cx('price')}>{item.attributes.price}</div>
                <div className={cx('time')}>{isNaN(moment(item.attributes.published))?item.attributes.published : getTime(item.attributes.published) }</div>
              </div>
        </div>
    </div>
  )
}
