import React,{useEffect, useState} from 'react'
import styles from './ListPost.module.scss';
import classNames from 'classnames/bind';
import PostItem from './PostItem/PostItem';
import {useDispatch,useSelector} from 'react-redux'

import { getPostsAction, getPostsLimitAction } from '../../../redux/actions/postsActions';
import Loading from '../../Loading/Loading';
const cx=classNames.bind(styles);
export default function ListPost() {
  
  const dispatch=useDispatch();
  const {posts,count} =useSelector(state=>state.postsReducer);
 
    useEffect(()=>{
       dispatch(getPostsLimitAction()); 
    },[]) 
  
    
  return (
    <div className={cx('wrapper')}>
          <Loading/>
          { posts?.length>0 && posts.map((item,index)=>{
              return <PostItem item={item} key={index}/>
          })}
          
    </div>
  )
}
   