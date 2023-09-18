import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './PostManagement.module.scss';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Button/Button'
import moment from 'moment'
import 'moment/locale/vi';  
import UpdatePost from '../../components/UpdatePost/UpdatePost';
import {useDispatch} from 'react-redux'
import {  EDIT_POST } from '../../redux/types/postsTypes';
import { useSearchParams } from 'react-router-dom';
import { deletePostervice } from '../../services/postsServices';
import { getPostsLimitCurrentAction } from '../../redux/actions/postsActions';
import Swal from 'sweetalert2';
const cx=classNames.bind(styles)
export default function PostManagement() {
  const [editPost,setEditPost]=useState(false);
  const {postsCurrent,count}=useSelector(state=>state.postsReducer);
   const dispatch=useDispatch();

const image=postsCurrent[0]?.images?.image && JSON.parse(postsCurrent[0]?.images?.image);
const [posts,setPosts]=useState([])
const [statusCode,setStatusCode]=useState(0);
const [searchParams]=useSearchParams();
const page=searchParams.get('page') || 1;

  useEffect(()=>{
    setPosts(postsCurrent)
   
  },[postsCurrent])
  useEffect(()=>{
      dispatch(getPostsLimitCurrentAction())
  },[count])
  
  useEffect(()=>{
    if(statusCode==1){
      const activePosts=postsCurrent.filter(item=>moment(item.overview.expire).valueOf() - moment().valueOf() >0)
      setPosts(activePosts);
    
    }else if(statusCode==2){
      const activePosts=postsCurrent.filter(item=>moment(item.overview.expire).valueOf() - moment().valueOf()  <=0)
      setPosts(activePosts);
    }else if(statusCode){
      setPosts(postsCurrent);
    }
  },[statusCode])
  useEffect(()=>{
    setStatusCode(0)
   
  },[page])
  const handleEditPost=(item)=>{
    setEditPost(true);
    dispatch({type:EDIT_POST,
             data:item
    })
  
  }
  const handleFilterByStatus=(e)=>{
    const value=e.target.value
       setStatusCode(value)
     
  }
  return (
    <div className={cx('wrapper')}>
            <div className={cx('head')}>
            <div className={cx('title')}>Quản lý tin đăng</div>
             <select onChange={(e)=>handleFilterByStatus(e)} value={statusCode}>
               <option value={'0'}>Lọc theo trạng thái:</option>
               <option value={'1'}>Đang hoạt động</option>
               <option value={'2'}>Đã hết hạn</option>
             </select>
            </div>
             {posts.length===0 ?<h4>Bạn chưa có tin đăng nào</h4>: ''}
             <div className={cx('posts')}>
                  <table>
                  <tbody>
                     <tr>
                         <th>Mã tin:</th>
                         <th>Ảnh đại diện:</th>
                         <th>Tiêu đề:</th>
                         <th>Giá:</th>
                         <th>Ngày bắt đầu:</th>
                         <th>Ngày hết hạn:</th>
                         <th>Trạng thái:</th>
                         <th>Tùy chọn</th>
                     </tr>
                   
                     {posts.length>0 && posts.map((item,index)=>{
                       const checkStatus=()=>{
                        const now=moment().valueOf();
                        const expired=moment(item.overview.expire).valueOf();
                        if(expired - now >=0){
                            return 'Đang hoạt động'
                        }else{
                          return 'Đã hết hạn'
                        }
                  }
                     
                      return  <tr key={index}>
                        <td>{item?.overview?.code}</td>
                        <td><img src= { JSON.parse(item?.images?.image)[0]} alt='avatar_post'/></td>
                        <td>{item.title}</td>
                        <td>{item.attributes.price}</td>
                        <td>{moment(item.overview.created).format('dddd,DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(item.overview.expire).format('dddd,DD/MM/YYYY HH:mm')}</td>
                        <td>{checkStatus()}</td>
                        <td><Button text={'Sửa'} onClick={()=>handleEditPost(item)}/> <Button text={'Xóa'} bgRed onClick={ async()=>{
                           const response= await  deletePostervice({postId:item.id});
                          
                               if(response.data.err==0){
                                Swal.fire({
                                  title: 'Thành công',
                                  text: 'Đã xóa thành công',
                                  icon: 'success',
                                  confirmButtonText: 'ok'
                                }).then(()=>{
                                  dispatch(getPostsLimitCurrentAction());
                                })
                                 
                               }
                        }}/></td>
                    </tr>
                     })}
                     
                     </tbody>
                    
                  </table>
                
             </div>
             {count>5? <div> <Pagination type={'postManage'}/> </div> :''}
             {editPost? <UpdatePost setEditPost={setEditPost} editPost={editPost}  />:''}
    </div>
  )
}

