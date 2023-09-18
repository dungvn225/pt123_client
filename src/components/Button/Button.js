import React from 'react'
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
const cx=classNames.bind(styles);
export default function Button({text,to,onClick,bgRed=false,icon,className=false ,btnRegister=false,btnLogout=false,bgYellow=false}) {
    let Comp='span'
    const _props={
         to,
         onClick
    }
    if(to){
         Comp=NavLink
    }
  return (
    <Comp className={cx('wrapper',{bgRed,btnLogout,btnRegister,bgYellow},[className])}  {..._props}>
            {text} <span className={cx('icon')}> {icon}</span>
    </Comp>
  )
}
