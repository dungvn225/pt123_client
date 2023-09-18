import React from 'react'
import styles from './Posts.module.scss';
import classNames from 'classnames/bind';
import ListPost from './ListPost/ListPost';
import Pagination from '../Pagination/Pagination';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';

const cx=classNames.bind(styles);
export default function Posts({codeCategory}) {
    
  const [sort,setSort]=useState(0);
  return (
    <div className={cx('wrapper')}>
         <div className={cx('content')}>
              <div className={cx('head')}>
                  <div className={cx('title')}>Danh sách tin đăng </div>
                  <div className={cx('sort')}>Sắp xếp : 
                      <span className={cx('name',sort==0?'active':'')} onClick={()=>setSort(0)}> mặc định  </span>
                      <span className={cx('name',sort==1?'active':'')} onClick={()=>setSort(1)}> mới nhất  </span>
                    
                   </div>
                 
              </div>
              <ListPost />
              <Pagination codeCategory={codeCategory} sort={sort}/> 
         </div>
       
         <div className={cx('sidebar')}> <SideBar/></div>
        
    </div>
  )
}
