import styles from './Rental.module.scss';
import classNames from 'classnames/bind';
import React   from 'react'
import LocationCity from '../../components/LocationCity/LocationCity';
import Posts from '../../components/Posts/Posts';
import { useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom'
import { formatVietnamersToString } from '../../utils/settings/config';
const cx=classNames.bind(styles);


export default function Rental() {
  
  
  const location=useLocation();
  
  const {categories}=useSelector(state=>state.categoriesReducer) 
  const path=location.pathname.slice(1,location.pathname.length); 
        
 
      const codeCategory= categories.find(item=>formatVietnamersToString(item.value)==path)?.code; 
                                                                                         
 
  return (
    <div className={cx('wrapper')}  >
         <div className={cx('content')}>
             <div className={cx('title')}> Kênh thông tin Phòng Trọ số 1 Việt Nam </div>
             <div className={cx('discription')}>
                Kênh thông tin Phòng Trọ số 1 Việt Nam
                 - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.

              </div>
            
                  <LocationCity/>  
           

                <Posts codeCategory={codeCategory}/>
        </div>
    </div>
  )
}
