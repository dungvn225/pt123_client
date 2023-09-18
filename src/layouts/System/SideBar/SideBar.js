import React from 'react'
import classNames from 'classnames/bind'
import styles from './SideBar.module.scss';
import { icons } from '../../../components/Icons';
import { config } from '../../../config';
import { useSelector,useDispatch } from 'react-redux';
import { images } from '../../../assets/images';
import {  useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../../redux/types/authTypes';
import {NavLink} from 'react-router-dom'
import { generateCode } from '../../../utils/common/generateCode';
const cx=classNames.bind(styles)
const {BsPencilSquare,BsBookmarks,HiOutlineUserCircle,AiOutlineContacts,AiOutlineLogout}=icons

const menuSideBar=[
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
    title:'Sửa thông tin cá nhân',
    icon:<HiOutlineUserCircle/>,
    path:config.routes.EDIT_ACOUNT
  },
  {
    id:4,
    title:'Liên hệ',
    icon:<AiOutlineContacts/>,
    path:config.routes.CONTACT
  },
 
]
export default function SideBar() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {currentData}=useSelector(state=>state.userReducer);
 
  return (
    <div className={cx('wrapper')}>
          
      <div className={cx('user')}>
         <img src={currentData.avatar || images.avatar} alt='avatar' className={cx('avatar')}/>
         <div className={cx('info')}> 
             <div className={cx('name')}>  <span >{currentData?.name} </span> </div>
             <div className={cx('code')}> Mã tk: {currentData?.id && generateCode(currentData.id)}</div>
         </div>
    </div>
      <div className={cx('menu')}>
            { menuSideBar?.map((item,index)=>{
              return <NavLink className={({isActive})=> cx('item',isActive?'active':'')} key={index}
                    
                     to={item.path}
                   > <span className={cx('icon')}>{item.icon}</span> {item.title}</NavLink>
                    })}
                                  <div className={cx('item')} 
                                      onClick={()=>dispatch({type:LOGOUT})}
                                     > <span className={cx('icon')}><AiOutlineLogout/> </span> Đăng xuất</div>
                              </div> 
    </div>
  )
}
