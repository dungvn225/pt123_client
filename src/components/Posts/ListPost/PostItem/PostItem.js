import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import {useNavigate} from 'react-router-dom'
import { formatVietnamersToString } from '../../../../utils/settings/config';
import { getTime } from '../../../../utils/common/generateDate';
import moment from 'moment'
import { icons } from '../../../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { savePostAction } from '../../../../redux/actions/postsActions';
import { images } from '../../../../assets/images';
const cx=classNames.bind(styles);
export default function PostItem({item}) {  
  const {postsSaved}=useSelector(state=>state.postsReducer)
   const [like,setLike]=useState(()=>postsSaved.find(post=>post.id==item.id)?.like || false);
   const [isCLick,setIsClick]=useState(()=>postsSaved.find(post=>post.id==item.id)?.isCLick || false);
   
   
  const navigate=useNavigate();
    const image=item.images && JSON.parse(item.images.image);  
    const description= JSON.parse(item.description);  
    const address=item.address.split(',');
    const {AiFillStar,AiFillHeart,AiOutlineHeart} =icons; 
    const dispatch=useDispatch();
 
       useEffect(()=>{
        const post={...item,like,isCLick}
     isCLick ===like &&   dispatch(savePostAction(post))  
       },[isCLick,like])


       useEffect(()=>{
        postsSaved  && setIsClick(postsSaved.find(post=>post.id==item.id)?.isCLick)
        postsSaved &&   setLike(postsSaved.find(post=>post.id==item.id)?.like)
       },[postsSaved])

       

      
      
      const renderStar=()=>{
        const stars = [];
        for (let i = 0; i < item?.star; i++) {
          stars.push(<AiFillStar color={'#febb02'} key={i} />);
        }
        return stars;
       
      }  
     
       
      const handleLike=(e,i)=>{
        e.stopPropagation();
        
        setLike(!like)
        setIsClick(!isCLick)
    
      

      }
  
   
  return (
 <div className={cx('wrapper')}>
  

    <div className={cx('img')} onClick={()=>{
                navigate(`/chi-tiet/${formatVietnamersToString(item.title)}/${item.id}`)
             }}
             
     style={{background:`url(${image[0]}) no-repeat center / contain` }}>
      <img src={image[0]}/>
        <div className={cx('info')}> 
          <div className={cx('text')}> {image.length} </div>
          <span  className={cx('icon')}>
             {like? <AiFillHeart color='#f73859'  onClick={(e)=>handleLike(e)}  onMouseLeave={()=>isCLick? setLike(true): setLike(false)}/> :
             <AiOutlineHeart onMouseEnter={()=>  setLike(true)} color='white' onClick={(e)=>handleLike(e)}/> }  </span>
        </div>
        
     </div>
    <div className={cx('content')}>
           <div className={cx('title')}  onClick={()=>{
                navigate(`/chi-tiet/${formatVietnamersToString(item.title)}/${item.id}`)
             }}>{renderStar()} { item.title} </div>
             <div className={cx('attributes')}>
                  <div className={cx('money')}>{item.attributes.price}</div>
                  <div className={cx('area')}>{item.attributes.acreage}</div>
                  <div className={cx('address')}>{address[address.length-2]+','+ address[address.length-1]} </div>
                 
             </div>
             <div className={cx('time')}>{isNaN(moment(item.attributes.published))?item.attributes.published : getTime(item.attributes.published) }</div>
             <div className={cx('description')}>
                    {description.length>4 ? description.slice(0,4).map((ele,index)=>{
                      return  <span key={index}> {ele}</span>
                    }) :description.map((ele,index)=>{
                      return  <span key={index}> {ele}</span>
                    }) }
               </div>
             <div className={cx('contact')}>
                <div style={{display:'flex',with:'90%'}}>
                      <div className={cx('avatar')} style={{background: `url(${item?.avatar || images.avatar}) no-repeat center/cover`}}></div>
                      <div className={cx('name')}>{item.user.name}</div>
                </div>
                 <div style={{with:'100%',display:'flex',flexWrap:'wrap'}} >
                  <div className={cx('zalo')}>Nhắn zalo</div>
                  <div className={cx('phone')}>Gọi {item.user.phone}</div>
                  </div>
             </div>
            
     </div>
    </div>
  )
}
