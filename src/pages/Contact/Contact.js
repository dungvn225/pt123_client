import React, { useState } from 'react'
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'
import Swal from 'sweetalert2';
const cx=classNames.bind(styles)
export default function Contact() {
    const [payload,setPayload]=useState({
      name:'',
      phone:'',
      content:''
    })
  const handleChange=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setPayload({...payload,[name]:value})

  }
 
  return (
    <div className={cx('wrapper')}>
          <div className={cx('content')}>
              <div className={cx('info')}>
                 <h3>Liên hệ với chúng tôi</h3>
                 <div className={cx('text')}>
               <b>  Thông tin liên hệ </b> <br/>
Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com<br/>

 <b>Điện thoại:</b> 0917 686 101 <br/>

<b> Email:</b> cskh.phongtro123@gmail.com <br/>

 <b> Zalo:</b> 0917 686 101<br/>

 <b> Viber:</b> 0917 686 101<br/>

 <b> Địa chỉ:</b> LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh. <br/>
                 </div>
              </div>
              <div className={cx('form')}>
                 <h4>Liên hệ trực tuyến</h4>
                  <label>Họ tên của bạn</label><br/>
                 <input name='name' onChange={(e)=>handleChange(e)} value={payload.name}/>
                 <label>Số điện thoại</label><br/>
                 <input name='phone' onChange={(e)=>handleChange(e)} value={payload.phone}/>
                
                 <textarea name='content' onChange={(e)=>handleChange(e)} value={payload.content}> </textarea>
                 <Button text={'Gửi liên hệ'} className={cx('btnContact')} onClick={()=>{
                     Swal.fire({
                      title: 'Cảm ơn '+payload.name+' !',
                      text: 'Phản hồi của bạn đã được chúng tôi ghi nhận',
                      icon: 'success',
                      confirmButtonText: 'ok'
                    }).then(()=>{
                      setPayload({
                        name:'',
                        phone:'',
                        content:''
                      })
                     
                    })
                 }}/>
              </div>
          </div>
    </div>
  )
}
