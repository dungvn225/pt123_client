import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getPostsLimitAction } from '../../redux/actions/postsActions';
import classNames from 'classnames/bind';
import styles from './DetailPost.module.scss';
import SliderCustom from '../../components/SliderCustom/SliderCustom';
import PostNew from '../../components/SideBar/PostNew/PostNew';
import { icons } from '../../components/Icons';
import { images } from '../../assets/images';
import moment from 'moment';


const cx=classNames.bind(styles)
export default function DetailPost() {
  const {newPosts,outStandingPosts}=useSelector(state=>state.postsReducer);
  const {GiPositionMarker,TbReportMoney,RiCrop2Line,BiTime ,BsFillTelephoneFill,AiOutlineHeart,SiZalo} =icons;
   const {avatar} =images
  const params=useParams();
  const postId=params.id
 
  const {posts}=useSelector(state=>state.postsReducer);
  const dispatch=useDispatch();
  const imagesPost=posts[0]?.images?.image && JSON.parse(posts[0]?.images?.image)  || []
 
  useEffect(()=>{
   
   dispatch(getPostsLimitAction({id:postId})) 
   
  },[postId])

 
  
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
           <SliderCustom images={imagesPost}/> 
           <h2>{posts[0]?.title}</h2>
           <span>Chuyên mục: <b>{posts[0]?.overview?.area} </b> </span> <br/>
           <div className={cx('address')}><GiPositionMarker color='#1266dd'/>  {posts[0]?.address}</div>
           <div className={cx('attributes')}>
             
                <span className={cx('price')}><TbReportMoney/> {posts[0]?.attributes?.price}</span>
               <span className={cx('area')}> <RiCrop2Line/> {posts[0]?.attributes?.acreage}</span>
               <span className={cx('published')}> <BiTime/> {posts[0]?.attributes?.published}</span>
               <span className={cx('hastag')}> #{posts[0]?.attributes?.hashtag}</span> 
           </div>
           <div className={cx('info')}>
                
                <div className={cx('avatar')} style={{background:`url(${posts[0]?.user?.avatar || avatar}) no-repeat center/contain`}}></div>
               <div>
               <div className={cx('name')}>{posts[0]?.user?.name}</div>
                <div className={cx('status')}> <div className={cx('dot')}></div>Đang hoạt động</div>

                <a href='' className={cx('phone')}> {posts[0]?.user?.phone}  </a>
                <a className={cx('zalo')} target='_blank' href={`https://zalo.me/${posts[0]?.user?.zalo}`}> Nhắn zalo</a>
                
               </div>
              
      </div>
           <h3>Thông tin mô tả</h3>
           <div className={cx('discription')}>
          { posts[0]?.description &&   JSON.parse(posts[0]?.description).map((item,index)=>{
            return <span key={index}>{item} <br/></span>
          })}
           </div>
           <h3>Đặc điểm tin đăng</h3>
           <table>
                    <tbody>
                        <tr> <td> Mã tin: </td> <td> {posts[0]?.overview?.code}</td></tr>
                         <tr>  <td> Khu vực: </td>  <td>  {posts[0]?.overview?.area} </td> </tr>
                         <tr> <td>  Loại tin rao: </td>  <td> {posts[0]?.overview?.type}  </td> </tr>
                         <tr> <td> Đối tượng truê: </td>  <td> {posts[0]?.overview?.target} </td> </tr>
                         <tr> <td> Gói tin: </td>  <td> {posts[0]?.overview?.bonus} </td> </tr>
                         <tr> <td> Ngày đăng: </td>  <td> {isNaN(moment(posts[0]?.overview?.created))?  posts[0]?.overview?.created : moment(posts[0]?.overview?.created).format('dddd,HH:mm DD/MM/YYYY') } </td> </tr>
                        <tr> <td> Ngày hết hạn: </td>  <td> {isNaN(moment(posts[0]?.overview?.expire))?  posts[0]?.overview?.expire : moment(posts[0]?.overview?.expire).format('dddd,HH:mm DD//MM/YYYY') } </td> </tr>
                    </tbody>
           </table>
           <h3>Thông tin liên hệ</h3>
           <table>
                  <tbody>
                      <tr> <td> Liên hệ: </td> <td> {posts[0]?.user?.name}</td></tr>
                         <tr>  <td> Điện thoại: </td>  <td>  {posts[0]?.user?.phone} </td> </tr>
                         <tr> <td>  Zalo: </td>  <td> {posts[0]?.user?.zalo}  </td> </tr>
                    </tbody>
           </table>
           </div>
           <div className={cx('sidebar')}>
           <div className={cx('info')}>
                
                     <div className={cx('avatar')} style={{background:`url(${posts[0]?.user?.avatar || avatar}) no-repeat center/contain`}}></div>
                     <div className={cx('name')}>{posts[0]?.user?.name}</div>
                     <div className={cx('status')}> <div className={cx('dot')}></div>Đang hoạt động</div>

                     <div className={cx('phone')}><i className={cx('icon')}> <BsFillTelephoneFill/> </i> {posts[0]?.user?.phone}  </div>
                     <div className={cx('zalo')}><i className={cx('icon')}><SiZalo/></i> <a target='_blank' href={`https://zalo.me/${posts[0]?.user?.zalo}`}> Nhắn zalo</a></ div>
                     <div className={cx('like')}><i className={cx('icon')}><AiOutlineHeart/></i> Yêu thích</div>
                   
           </div>
           <div className={cx('postNew')}>
           <PostNew data={outStandingPosts} title={'Tin nổi bật'}/>
           <PostNew data={newPosts} title={'Tin mới đăng'}/>
           
           </div>
           </div>
     </div>
  )
}
