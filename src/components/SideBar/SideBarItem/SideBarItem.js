import React from 'react'
import classNames from 'classnames/bind'
import styles from './SideBarItem.module.scss';
import {AiOutlineRight} from 'react-icons/ai'
import { formatVietnamersToString } from '../../../utils/settings/config';


import { createSearchParams, useNavigate ,useLocation} from "react-router-dom";


const cx=classNames.bind(styles)
export default function SideBarItem({data,title,isDouble,type}) {
 
  const location=useLocation();

 
    const navigate=useNavigate();
  if(!isDouble){ return (
    <div className={cx('wrapper')} >
         <div className={cx('title')}> {title}</div>
          {data?.length>0 && data.map((item,index)=>{
               return <div className={cx('item')} key={index}
               onClick={()=>{
                navigate(`/${formatVietnamersToString(item.value)}`)
             }}
             > 
                          <AiOutlineRight className={cx('icon')}/>
                          <div className={cx('value')}> {item.value}</div>
                  </div>
          })}
    </div>
  )}else{
      const data1=[];
      const data2=[];
         data.map((item,index)=>{
          if(index%2==0){
            data1.push(item)
          }else{
            data2.push(item)
          }
      })
      const handleFilter=(code)=>{
        navigate({
          pathname: location.pathname,
          search: createSearchParams({
              [type]:code 
          }).toString()
      });
  
      }
    
    return (
      <div className={cx('wrapper')}>
           <div className={cx('title')}> {title}</div>
           
           {data1.length>0 && data1.map((item1,index)=>{
               return <div className={cx('item')} key={index}   style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}> 
                      <div  className={cx('content')}> 
                          <AiOutlineRight className={cx('icon')}/>
                          <div className={cx('value')} 
                            onClick={(code)=>handleFilter(item1.code)}
                          > {item1.value}</div>
                      </div>
                      <div className={cx('content')} > 
                          <AiOutlineRight className={cx('icon')}/>
                          <div className={cx('value')}
                            onClick={(code)=>handleFilter(data2[index].code)}
                          > {data2[index].value}</div>
                      </div>
                  </div>
          })}
          
           
          
      </div>
    ) 
  }
        
}
