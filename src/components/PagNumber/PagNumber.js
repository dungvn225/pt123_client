import React from 'react'
import styles from './PagNumber.module.scss';
import classNames from 'classnames/bind';
import { useNavigate,useSearchParams,createSearchParams } from "react-router-dom";
import {useLocation} from 'react-router-dom'
const cx=classNames.bind(styles)
export default function PagNumber({item,setCurrentPage}) {
  const location=useLocation();
const [searchParams]=useSearchParams();
  const entries=searchParams.entries();
  const page=searchParams.get('page')||1

    const navigate = useNavigate();
   
    
    let append=(entries)=>{
      const params=[];
 
      searchParams.append('page',item);  
     
      for(let entry of entries){
        params.push(entry);
      }
       
      let searchParamsObject={}
     
    
    params.forEach(item => {
      const key = item[0];
      const value = item[1];
    
      if (searchParamsObject[key] && key!=='page') {
        searchParamsObject[key].push(value);
      } else {
        searchParamsObject[key] = [value];
      }
    });
    return searchParamsObject
    }
    const handleChangePage=()=>{
  
      setCurrentPage(item) 
     
      navigate({
        pathname: location.pathname, 
        search: createSearchParams({
         ...append(entries)     
        }).toString()
    });
        
    }
  return (
    <div className={cx('wrapper',item==page?'active':'')}  onClick={()=>handleChangePage()}> {}
        
         {item}  
        
    </div>
  )
  
}

