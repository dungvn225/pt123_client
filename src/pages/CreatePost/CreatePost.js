import React, { useState } from 'react'
import styles from './CreatePost.module.scss';
import classNames from 'classnames/bind';
import Address from '../../components/Address/Address';
import Overview from '../../components/Overview/Overview';
import { useSelector } from 'react-redux';

const cx=classNames.bind(styles);
export default function CreatePost({editPost,setEditPost}) {
 
  const {dataEdit}= useSelector(state=>state.postsReducer);
  
const {categories}=useSelector(state=>state.categoriesReducer);
  
  
 const images=editPost ? JSON.parse(dataEdit?.images?.image): [];
  const [payload,setPayload]=useState({
    title: editPost? dataEdit?.title : '',
    address:editPost? dataEdit?.address : '',
    category:editPost? categories.find(item=>item.code==dataEdit?.categoryCode)?.value ||''  : '',
    categoryCode:editPost? dataEdit?.categoryCode :'',
    target:editPost? dataEdit?.overview?.target : '',
    description:editPost? JSON.parse( dataEdit?.description)[0] : '',
    priceNumber:editPost? dataEdit?.priceNumber *Math.pow(10,6) : '',
    priceCode:editPost? dataEdit?.priceCode : '',
    areaNumber:editPost? dataEdit?.areaNumber : '',
    areaCode:editPost? dataEdit?.areaCode : '',
    images:images ,
   

})

const [inValidFields,setInvalidFields]=useState([])




  return (
    <div className={cx('wrapper')}>
       
      <div className={cx('content')}> 
      <div className={cx("title")}>{editPost ? 'Sửa bài đăng' :'Đăng tin mới'}</div>
      <Address  payload={payload} setPayload={setPayload} editPost={editPost} inValidFields={inValidFields} setInvalidFields={setInvalidFields}/>
       <Overview payload={payload} setPayload={setPayload}  inValidFields={inValidFields} setInvalidFields={setInvalidFields} editPost={editPost} setEditPost={setEditPost}/>
      </div>
     
        
    </div>
  )
}
