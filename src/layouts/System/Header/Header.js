import React from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import Navigation from '../../../components/Navigation/Navigation'
import {useNavigate} from 'react-router-dom'
import { config } from '../../../config'
const cx=classNames.bind(styles)
export default function Header() {
    const navigate=useNavigate();
  return (
    <div className={cx('wrapper')}>
          <div 
          className={cx('logo')}
          onClick={()=>{navigate(config.routes.Home)}}
          >Phongtro123.com</div>
          <Navigation/>

    </div>
  )
}
