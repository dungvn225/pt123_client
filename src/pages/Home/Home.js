import React,{useEffect,useRef} from 'react'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import LocationCity from '../../components/LocationCity/LocationCity';
import Posts from '../../components/Posts/Posts';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatVietnamersToString } from '../../utils/settings/config';
import PostNew from '../../components/SideBar/PostNew/PostNew';


const cx=classNames.bind(styles);
export default function Home() {
  const {categories}=useSelector(state=>state.categoriesReducer);
  const {newPosts}=useSelector(state=>state.postsReducer);
 
  return (
    <div className={cx('wrapper')}  >
         <div className={cx('content')}>
            <div className={cx('intro')}>
            <div className={cx('title')}> Kênh thông tin Phòng Trọ số 1 Việt Nam </div>
             <div className={cx('discription')}>
                Kênh thông tin Phòng Trọ số 1 Việt Nam
                 - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.

              </div>
            </div>
             <div className={cx('categories')}>
                 <h3>Danh mục cho thuê</h3>
                 <ul>
                    {categories?.length>0 && categories.map((item,index)=>{
                      return  <li key={index}>
                      <NavLink to={'/'+formatVietnamersToString(item.value)}>{item.value}</NavLink>
                   </li>
                    })}
                   
                 </ul>
             </div>
            <div className={cx('location')}>
              <h3>Khu vực nổi bật</h3>
                  <LocationCity/>  
            </div>
           

                <Posts />
                <div className={cx('newPosts')}>
                <PostNew data={newPosts} title={'Tin mới đăng'}/>
                </div>
               
        </div>
    </div>
  )
}


