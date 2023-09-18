import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.scss';
import { images } from '../../assets/images';

import {useSearchParams,useNavigate, NavLink} from 'react-router-dom'
import Button from '../Button/Button';
import { config } from '../../config';
import {useDispatch,useSelector} from 'react-redux'
import { LOGOUT } from '../../redux/types/authTypes';
import User from '../User/User';
import { icons } from '../Icons';
import { formatVietnamersToString } from '../../utils/settings/config';

const cx=classNames.bind(styles);
const {BsPencilSquare,BsBookmarks,HiOutlineUserCircle,AiOutlineLogout,AiOutlineHeart,FaBars,AiOutlineRight}=icons


const menuManager=[
        {
          id:1,
          title:'Đăng tin cho thuê',
          icon:<BsPencilSquare/>,
          path:config.routes.CREATE_POST
        },
        {
          id:2,
          title:'Quản lý tin đăng',
          icon:<BsBookmarks/>,
          path:config.routes.POST_MANAGE
        },
        {
          id:3,
          title:'Thông tin tài khoản',
          icon:<HiOutlineUserCircle/>,
          path:config.routes.EDIT_ACOUNT
        },
       
]
   

export default function Header() {
  const headerRef=useRef();
  const [params]=useSearchParams();
  const page=params.get('page');
  const dispatch=useDispatch();
  const {isLogin} =useSelector(state=>state.authReducer);
  const {currentData}=useSelector(state=>state.userReducer);
  const  {BiChevronDown}=icons
  const [showHideMenu,setShowHideMenu]=useState(false)
  const navigate=useNavigate();
  const {categories}=useSelector(state=>state.categoriesReducer)
  const {postsSaved}=useSelector(state=>state.postsReducer)
useEffect(()=>{
      headerRef.current.scrollIntoView({behavior:"smooth", block: "start", inline:"nearest"});
},[parseInt(page)]);

  return (
    <div className={cx('wrapper')} ref={headerRef}>
            <div className={cx('logo')} onClick={()=>{
              navigate(config.routes.Home)
            }}>
                <img  src={images.logo} />
            </div>
            <div className={cx('action')}>
                <div className={cx('content',isLogin? 'login':'')}>
                  <div className={cx('like')} onClick={()=>{navigate(config.routes.POST_SAVED)}}>
                       <div className={cx('heart')}>
                           <AiOutlineHeart size={'20px'}/>
                            <div className={cx('number')}>{postsSaved?.length}</div>
                        </div> 
                        <div className={cx('text')}>Yêu thích</div>
                  </div>
                  {isLogin? <div style={{width:'60%'}}>
                       <div className={cx('user')}> <User currentData={currentData}/>
                           <div style={{width:'46%',position:'relative'}}>
                              <Button
                               text={'Quản lý tài khoản'}
                               onClick={()=>{setShowHideMenu(prev=>!prev)}}
                               btnLogout
                               icon={<BiChevronDown/>}
                               
                              > </Button>
                          { showHideMenu &&   <div className={cx('menu')}>
                                  {menuManager.map((item,index)=>{
                                    return <div className={cx('item')} key={index}
                                       onClick={()=>{navigate(item.path)}}
                                    > <span className={cx('icon')}>{item.icon}</span> {item.title}</div>
                                  })}
                                  
                                  <div className={cx('item')} 
                                      onClick={()=>dispatch({type:LOGOUT})}
                                     > <span className={cx('icon')}><AiOutlineLogout/> </span> Đăng xuất</div>
                              </div> }
                           </div>
                       </div> 
                  </div>:
                  <span style={{width:'38%',marginLeft:'auto'}}>
                     <Button to={config.routes.Login} text={'Đăng nhập'}/>
                     <Button btnRegister to={config.routes.Register} text={'Đăng ký'}/>
                  </span>}
               
                <Button bgRed  text={'Đăng tin mới'} to={ config.routes.CREATE_POST } style={{marginLeft:'4px'}}/> 
                </div>
            </div>
            <div className={cx('menu-moble')} onClick={()=>{
                 setShowHideMenu(!showHideMenu)
            }}>
               <FaBars size={'22px'} cursor={'pointer'}/> <div className={cx('text')}>Danh mục</div>
            {  showHideMenu &&  <div className={cx('overlay')} onClick={(e)=>{
                 e.stopPropagation()
                  setShowHideMenu(false)
                }}>
                <div className={cx('content')} onClick={(e)=>{
                 e.stopPropagation()
                  setShowHideMenu(true)
                }}>
                  <div className={cx('head')}>
                     {!isLogin ? <h3>Chào mừng bạn đến với phongtro123.com</h3> :''}
                      {!isLogin? <>
                        <Button text={'Đăng nhập'} bgYellow onClick={(e)=>{
                         e.stopPropagation()
                         setShowHideMenu(false)
                         navigate(config.routes.Login)
                      }}/> <Button text={'Đăng ký'} bgYellow onClick={(e)=>{
                        e.stopPropagation()
                        setShowHideMenu(false)
                        navigate(config.routes.Register)
                     }}/> 
                      </>:<div className={cx('info')}>
                               <div className={cx('avatar')} style={{background:`url(${currentData?.avatar || images.avatar}) no-repeat center / cover`}}></div>
                               <div className={cx('name')}>{currentData?.name}</div>
                               <div className={cx('phone')}>{currentData?.phone}</div>
                              <div><Button text={'Cá nhân'} bgYellow onClick={(e)=>{
                          e.stopPropagation()
                           setShowHideMenu(false)
                           navigate(config.routes.EDIT_ACOUNT)
                        }}/> <Button text={'Quản lý tin'} bgYellow  onClick={(e)=>{
                          e.stopPropagation()
                           setShowHideMenu(false)
                           navigate(config.routes.POST_MANAGE)
                        }}/></div>
                        </div>}
                  </div>
                  <div className={cx('body')}>
                     <ul>
                       <li onClick={(e)=>{
                         e.stopPropagation()
                           setShowHideMenu(false)
                        }}>
                         <NavLink to={config.routes.Home}>Trang chủ</NavLink> <AiOutlineRight/>
                       </li>
                      {categories.length>0 && categories.map((item,index)=>{
                        return <li key={index} onClick={(e)=>{
                          e.stopPropagation()
                           setShowHideMenu(false)
                        }}>
                        <NavLink to={'/'+formatVietnamersToString(item.value)}>{ item.value}</NavLink>  <AiOutlineRight/>
                             </li>
                      })}
                         
                     </ul>
                  </div>
               </div>
                </div> }
               
            </div>
    </div>
  )
}
