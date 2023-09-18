import React from 'react'
import styles from './UpdatePost.module.scss';
import classNames from 'classnames/bind';
import CreatePost from '../../pages/CreatePost/CreatePost';
const cx=classNames.bind(styles);
export default function UpdatePost({setEditPost,editPost}) {
   
  return (
    
    <div className={cx('wrapper')} onClick={()=>setEditPost(false)}>
         <div className={cx('content')} onClick={(e)=>{setEditPost(true) ; e.stopPropagation()}}>
            <CreatePost editPost={editPost} setEditPost={setEditPost}/> 
         </div>
    </div>
    
  )
}
