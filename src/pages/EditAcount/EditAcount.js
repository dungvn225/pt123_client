import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './EditAcount.module.scss';
import ReadOnly from '../../components/ReadOnly/ReadOnly';
import { images } from '../../assets/images';
import Button from '../../components/Button/Button';
import {useDispatch, useSelector} from 'react-redux'
import { apiUploadImages } from '../../services/postsServices';
import { updateUserService } from '../../services/userSevices';
import { getCurrentAction } from '../../redux/actions/userActions';
import Swal from 'sweetalert2';
import { generateCode } from '../../utils/common/generateCode';
const cx=classNames.bind(styles)
export default function EditAcount() {
    const {currentData} =useSelector(state=>state.userReducer);
    const dispatch=useDispatch();
  
    const [payload,setPayload]=useState({
          name:currentData.name || '',
          email:currentData.email || '',
          zalo:currentData.zalo ||'',
          facebook_url:currentData.facabook || '',
          avatar:currentData.avatar || ''

    })

    const handleChange=(e)=>{
          const name=e.target.name;
          const value=e.target.value;
          setPayload(prev=>({...prev,[name]:value}))
    }
   
    const handleImage= async(e)=>{
        const files=e.target.files;
        const formData = new FormData();
     
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          formData.append("file", file);
          formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME); 
           const response= await apiUploadImages(formData); 
             if(response.status==200){
           
                 setPayload(prev=>({...prev,avatar: response?.data?.secure_url}))
             }
          
        } 
       
     

    }
    const handleSubmit= async()=>{
        const data={...payload};
         const response=await updateUserService(data);
       
          if(response.data.err==0){
          
          
            if(response.data.err==0){
               Swal.fire({
                 title: 'Thành công',
                 text: 'Đã chỉnh sửa thông tin cá nhân thành công',
                 icon: 'success',
                 confirmButtonText: 'ok'
               }).then(()=>{
                  dispatch(getCurrentAction())
               })
              }
           
          }
    }
  return (
    <div className={cx('wrapper')}>
          <h4>Cập nhật thông tin cá nhân</h4>
          <div className={cx('content')}>
               <div className={cx('form-group')}>
                    <div className={cx('title')}>Mã thành viên</div>
                    <div className={cx('value')}><ReadOnly text={currentData?.id && generateCode(currentData?.id)}/> </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}>Số điện thoại</div>
                    <div className={cx('value')}><ReadOnly text={currentData.phone} /> </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}></div>
                    <div className={cx('value','phoneChange')}>Đổi số điện thoại </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}>Tên hiển thị</div>
                    <div className={cx('value')}><input name='name' value={payload.name} onChange={(e)=>handleChange(e)}/> </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}>Email</div>
                    <div className={cx('value')}><input name='email'  value={payload.email}  onChange={(e)=>handleChange(e)}/> </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}>Số zalo</div>
                    <div className={cx('value')}><input name='zalo' value={payload.zalo} onChange={(e)=>handleChange(e)}/> </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}>Facebook</div>
                    <div className={cx('value')}><input name='facebook_url' value={payload.facebook_url} onChange={(e)=>handleChange(e)}/> </div>
                 </div>
                 <div className={cx('form-group','password')}>
                    <div className={cx('title')}>Mật khẩu</div>
                    <div className={cx('value','passwordChange')}>Đổi mặt khẩu </div>
                 </div>
                 <div className={cx('form-group')}>
                    <div className={cx('title')}>Ảnh đại diện</div>
                    <div className={cx('value')}> 
                       <img src={payload.avatar || images.avatar}/>  <br/>
                       <label id='file'> 
                          chọn ảnh <input type='file'  id='file' hidden onChange={(e)=>handleImage(e)}/> 
                     </label> </div>
                 </div>
                <Button text={'Cập nhật'} className={cx('btnUpdate')} onClick={()=>handleSubmit()}/>
          </div>
    </div>
  )
}
