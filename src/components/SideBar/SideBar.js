import React from 'react'
import styles from './SideBar.module.scss'
import classNames from 'classnames/bind'
import {useSelector} from 'react-redux'
import SideBarItem from './SideBarItem/SideBarItem'
import PostNew from './PostNew/PostNew'
const cx=classNames.bind(styles)
export default function SideBar() {

  const {categories}=useSelector(state=>state.categoriesReducer);
  const {prices}=useSelector(state=>state.pricesReducer); 
  const {areas}=useSelector(state=>state.areasReducer); 
  const {newPosts}=useSelector(state=>state.postsReducer);
  
 
  return (
   
        <div className={cx('wrapper')}>
                <SideBarItem data={ categories} title={'Danh mục cho thuê'} />
                 <SideBarItem data={prices} title={'Xem theo giá'}  isDouble={true}  type='priceCode'/> 
                  <SideBarItem data={areas} title={'Xem theo diện tích'}  isDouble={true}  type='areaCode'/> 
                  <PostNew data={newPosts} title={'Tin mới đăng'}/>
         </div>
    
  )
}