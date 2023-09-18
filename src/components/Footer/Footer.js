import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Footer.module.scss';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { formatVietnamersToString } from '../../utils/settings/config';
import { icons } from '../Icons';
import Button from '../Button/Button';
import Contact from './Contact/Contact';
import {useNavigate} from 'react-router-dom'
import { config } from '../../config';
const cx=classNames.bind(styles)
const WHYUS=[
  {
    number:116998,
    text:'Thành viên'
  },
  {
    number:103348,
    text:'Tin đăng'
  },
  {
    number:300000,
    text:'Lượt truy cập/tháng'
  },
  {
    number:2500000,
    text:'Lượt xem/tháng'
  }
]
const handleScrollToTop=()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
export default function Footer() {
  const {AiFillStar, AiOutlineHome,AiOutlineHeart,IoAddCircleOutline,AiOutlineLogout,RiUserAddLine,AiOutlineArrowUp} =icons
  const {categories} =useSelector(state=>state.categoriesReducer)
  const navigate=useNavigate();
  const [arrow,setArrow]=useState(false);
  useEffect(()=>{
    const handleScroll=()=>{
       window.scrollY>100?setArrow(true):setArrow(false)
    }
     window.addEventListener('scroll',handleScroll);
  })
  return (
    <div className={cx('wrapper')}>
       <div className={cx('content')}>
       <div className={cx('title')}> Tại sao lại chọn PhongTro123.com?</div>
       <div className={cx('description')}>Chúng tôi biết bạn có rất nhiều lựa chọn, 
       nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: 
        {categories?.length>0 && categories.map((item,index)=>{
          
           return <Link key={index} className={cx('link')} to={`/${formatVietnamersToString(item.value)}`}>{item.value}, </Link>
        })}
       ...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, 
        do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
      </div>
      <div className={cx('whyus')}>
           {WHYUS.map((item,index)=>{
           return  <div className={cx('item')} key={index}>
             <div className={cx('number')}>{item.number.toLocaleString()}+</div>
             <div className={cx('text')}>{item.text}</div>
           </div>
           })}
      </div>
      <div className={cx('title')}>Chi phí thấp, hiệu quả tối đa</div>
       <div className={cx('star')}><AiFillStar /><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
       <i className={cx('description')}>"Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."
Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)</i>
           <div className={cx('title')}>Bạn đang có phòng trọ / căn hộ cho thuê?</div>
           <div className={cx('description')}>Không phải lo tìm người cho thuê, phòng trống kéo dài</div>
           <Button text={'Đăng tin ngay'} bgRed className={cx('btnPost')} onClick={()=>{
                navigate(config.routes.CREATE_POST)
           }}/>
       </div>

        <Contact/>
        <div className={cx('actions')}>
              <ul>
                 <li>
                    <NavLink to={config.routes.Home}>
                        <div className={cx('icon')}> <AiOutlineHome/></div>
                        <div className={cx('text')}> Trang chủ</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={config.routes.POST_SAVED}>
                        <div className={cx('icon')}> <AiOutlineHeart/></div>
                        <div className={cx('text')}> Yêu thích</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={config.routes.CREATE_POST}>
                        <div className={cx('icon')}> <IoAddCircleOutline/></div>
                        <div className={cx('text')}> Đăng tin</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={config.routes.Login}>
                        <div className={cx('icon')}> <AiOutlineLogout/></div>
                        <div className={cx('text')}> Đăng nhập</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={config.routes.Register}>
                        <div className={cx('icon')}> <RiUserAddLine/></div>
                        <div className={cx('text')}> Đăng ký</div>
                    </NavLink>
                    
                 </li>
              </ul>
        </div>
        <div className={cx('arrow',arrow?'active':'')} onClick={()=>handleScrollToTop()}><AiOutlineArrowUp/></div>
    </div>
  )
}
