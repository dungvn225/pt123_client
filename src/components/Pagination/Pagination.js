import React,{useEffect,useState} from 'react'
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import PagNumber from '../PagNumber/PagNumber';
import {useDispatch,useSelector} from 'react-redux'
import { icons } from '../Icons';
import { createSearchParams, useNavigate } from "react-router-dom";


import { useSearchParams,useLocation } from "react-router-dom";
import { getPostsLimitAction, getPostsLimitCurrentAction } from '../../redux/actions/postsActions';
import { LIMIT } from '../../utils/settings/config';


const cx=classNames.bind(styles);

const {TbPlayerTrackPrev,TbPlayerTrackNext} =icons
export default function Pagination({codeCategory,type,sort}) {
  const location=useLocation();

 
  const navigate = useNavigate();
   
  const dispatch=useDispatch();
  const [arrPage,setArrPage]=useState([]);
  const [searchParams]=useSearchParams();
   const entries=searchParams.entries()
  const [currentPage,setCurrentPage]=useState(parseInt(searchParams.get('page')) || 1)
  
  const s1=location.search
  const priceCode=searchParams.get('priceCode')
  const page=searchParams.get('page')
  const areaCode=searchParams.get('areaCode');
  const categoryCode=searchParams.get('categoryCode');
  const provinceCode=searchParams.get('provinceCode');
    
   
  const {TbPlayerTrackPrev,TbPlayerTrackNext}=icons;

  const {posts,count} =useSelector(state=>state.postsReducer);

const totalPage=count>0 && Math.ceil(count/LIMIT) ||0;   
let append=(entries)=>{
  const params=[];

  searchParams.append('page',currentPage);  
 
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

      
    
useEffect(()=>{
  const params=[];
   
  
 
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
   searchParamsObject={...searchParamsObject,categoryCode:codeCategory} 

  
   
    let start=currentPage -3 <=0 ? 1: currentPage -3 ;
    let end=currentPage+3  >totalPage ? totalPage :  currentPage+3  
   
    let arrNumber=[]
   
    for(let i=start;i<=end;i++){
     
        arrNumber.push(i);
    }
   
    setArrPage(arrNumber) 
 
      
             if(sort==1){
              searchParamsObject.order=['createdAt','DESC']
             }
             
    type? dispatch(getPostsLimitCurrentAction({page})) :   dispatch(getPostsLimitAction(searchParamsObject))
     
      setCurrentPage(parseInt(searchParams.get('page')) || 1) 
     
},[searchParams,codeCategory,totalPage,sort]) 
  
   const handlePage=(page)=>{
       setCurrentPage(page)
      
     
   }
  return (
    <div className={cx('wrapper')}>
         {currentPage -3 >1 && <span><TbPlayerTrackPrev className={cx('start-icon')}
          onClick={()=>{
            navigate({
              pathname: location.pathname,
              search: createSearchParams({
               ...append(entries),page:1      
              }).toString()
          });
            setCurrentPage(1) 
          }}
         /><span>...</span></span>}
        { arrPage.length>0 && arrPage.map((item,index)=>{ 
            return  <PagNumber item={item} key={index}  currentPage={currentPage}  setCurrentPage={(page)=>handlePage(page)}/> 
        })}
        {currentPage +3 <totalPage && <span> <span>...</span><TbPlayerTrackNext className={cx('end-icon')}
          onClick={()=>{
           
            navigate({
              pathname: location.pathname,
              search: createSearchParams({
               ...append(entries),page:totalPage      
              }).toString()
          });
            setCurrentPage(totalPage) 
          }}
        /></span>}
    </div>
  )
}




