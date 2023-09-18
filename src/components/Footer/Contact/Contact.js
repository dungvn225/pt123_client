import React from 'react'
import styes from './Contact.module.scss';
import classNames from 'classnames/bind';
import ContactItem from './ContactItem/ContactItem';
import {useNavigate} from 'react-router-dom'
import { images } from '../../../assets/images';
import Button from '../../Button/Button';
import { config } from '../../../config';
const cx=classNames.bind(styes)
const CONTACT=[
    {
      title:'HỖ TRỢ THANH TOÁN',
      phone: '0917686101',
      zalo: '0917686101'
    },
    {
      title:'HỖ TRỢ ĐĂNG TIN',
      phone: '0902657123',
      zalo: '0902657123'
    },
    {
      title:'HOTLINE 24/7',
      phone: '0917686101',
      zalo: '0917686101'
    }
  ]
export default function Contact() {
  const navigate=useNavigate();
  return (
    <div className={cx('wrapper')}>
       
              <div className={cx('bg')} style={{  background:`url(${images.contact_bg}) no-repeat center / contain`}}></div>
              <div className={cx('discription')}>Liên hệ với chúng tôi nếu bạn cần hỗ trợ:</div>
              <div className={cx('info')}>
              {CONTACT.map((item,index)=>{
                 return <ContactItem key={index} item={item}/>
              })}
              </div>
              <Button text={'Gửi liên hệ'} onClick={()=>{
                   navigate(config.routes.CONTACT)
              }}/>
             
           
    </div>
  )
}
