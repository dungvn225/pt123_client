import React, { useEffect, useState } from 'react'
import styles from './PostSaved.module.scss';
import classNames from 'classnames/bind';
import PostItem from '../../components/Posts/ListPost/PostItem/PostItem';
import { useSelector } from 'react-redux';
import SideBarItem from '../../components/SideBar/SideBarItem/SideBarItem';
import PostNew from '../../components/SideBar/PostNew/PostNew';
import {icons} from '../../components/Icons'
const cx=classNames.bind(styles)
export default function PostSaved() {
  const {postsSaved,outStandingPosts}=useSelector(state=>state.postsReducer)
  const {categories}=useSelector(state=>state.categoriesReducer);
 const [posts,setPosts]=useState([])
 const {AiFillHeart}=icons;

  useEffect(()=>{
    setPosts(postsSaved)
  },[])
  return (
    <div className={cx('wrapper')}>
          <span className={cx('content')}>
              <h4>Tin đã lưu</h4>

              {posts.length>0?  posts.map((item,index)=>{ 
                                                                     
                return <PostItem item={item} key={index}/>
              }):
               <div className={cx('postEmpty')}> <AiFillHeart size={'50'} color={'#f73859'}/> <br/>Danh sách rỗng</div>}
          </span>
          <div className={cx('sidebar')}>
          <SideBarItem data={ categories} title={'Danh mục cho thuê'} />
          <PostNew data={outStandingPosts} title={'Tin nổi bật'}/>
          </div>
    </div>
  )
}
