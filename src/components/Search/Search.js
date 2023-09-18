import React,{useEffect, useState} from 'react'
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import SearchItem from './SearchItem/SearchItem';
import { MdOutlineHouseSiding } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbReportMoney } from "react-icons/tb";
import { RiCrop2Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import Modal from '../Modal/Modal';
import { useSelector } from 'react-redux';

import { config } from '../../config';

import { useNavigate,createSearchParams, useLocation } from "react-router-dom";
const SEARCH=[
    {
        iconBefore: <MdOutlineHouseSiding/>,
        iconAfter: <BsChevronRight/>,
        text: 'Phòng trọ,nhà trọ',
        name:'category'
    },
    {
        iconBefore: <HiOutlineLocationMarker/>,
        iconAfter: <BsChevronRight/>,
        text:   'Toàn quốc',
        name:'province'
    },
    {
        iconBefore: <TbReportMoney/>,
        iconAfter: <BsChevronRight/>,
        text: 'Chọn giá',
        name:'price'
    },
    {
        iconBefore: <RiCrop2Line/>,
        iconAfter: <BsChevronRight/>,
        text: 'Chọn diện tích',
        name:'area'
    },
  
    
]
const cx=classNames.bind(styles);
export default function Search() {
    const {provinces}=useSelector(state=>state.provinceReducer);
    const {categories}=useSelector(state=>state.categoriesReducer);
    const {prices}=useSelector(state=>state.pricesReducer); 
    const {areas}=useSelector(state=>state.areasReducer); 
    const [data,setData]=useState(''); 
    const [text,setText]=useState('');
    const [name,setName]=useState('')
    const [queries,setQueries]=useState({})
    const [arrMaxMin,setArrMaxMin]=useState({})
    const navigate=useNavigate();
    const location=useLocation();
    
     
   
   
  
    
   useEffect(()=>{
       if(!location.pathname.includes(config.routes.SEARCH_DETAIL)){
         setQueries({})
       }
   },[location])
    const [showHideModal,setShowHideModal]=useState(false)
    
    const handleModal=(status,item)=>{
       
       
        let content=''  
      
        let text='';
        if(item?.name=='province'){  
          
           content=provinces.length>0 && provinces
            
        }
        if(item?.name=='category'){
            content=categories.length>0 && categories
        
        }
        if(item?.name=='price'){
           content=prices.length>0 &&  prices
          
        }
        if(item?.name=='area'){
           content=areas.length>0 && areas
         
        }
        setText(item.text)
       setData(content)
       setName(item.name) 
       
     
       setShowHideModal(status)  
       
    }
    
    const handleSubmit=(query,arrMaxMin)=>{  
      
      arrMaxMin &&  setArrMaxMin(prev=>({...prev,arrMaxMin}))
      
       setQueries(prev=>({...prev,...query})) 
       setShowHideModal(false)
        
      
      
    }
  
     
    
    useEffect(()=>{
        
    },[queries])
    
    const handleShowHideModal=(status)=>{
        setShowHideModal(status)
    }

  
    const handleSearch=()=>{ 
       
         const queryCodes=Object.entries(queries).filter(item=>(item[0].includes('Code') || item[0].includes('Number'))&& item[1]!==null)
         const queryCodesObj={}; 
         queryCodes.forEach(item=>{
            queryCodesObj[item[0]]= item[1]
         })
       
         const queryTexts=Object.entries(queries).filter(item=>(!item[0].includes('Code') || !item[0].includes('Number'))&& item[1]!==null)
        
            let category='';
            let province='';
            let price='';
            let area='';
            let titleSearch='';
            queryTexts.forEach(item=>{
                 
                  if(item[0]=='category'){
                    category=item[1]
                }else if(item[0]=='province'){
                    province=item[1]
                  }else  if(item[0]=='price'){
                    price=item[1]
                }else if(item[0]=='area'){
                    area=item[1]
                }
                 
            })
            if(province){
                province=province+' '
            }
             if(price){
                price='giá '+price+' '
             }
             if(area){
                area='diện tích '+area
             }
            titleSearch=category+' '+province+price+area
           
         navigate({
            pathname: config.routes.SEARCH_DETAIL, 
            search: createSearchParams(queryCodesObj).toString() 
        },{state: {titleSearch}});
                                       
    }
  
  return (
    <div className={cx('wrapper')}>
        <div className={cx('search')} >
        {SEARCH.map((item,index)=>{
          
            return  <SearchItem item={item} text={text}  queries={queries}  key={index}  handleModal={(status,item)=>handleModal(status,item)}  /> 
        })}
        <div className={cx('btnSearch')} onClick={()=>handleSearch()}><AiOutlineSearch/> Tìm kiếm</div>
        </div>
      
      {showHideModal? <Modal
       handleShowHideModal={(status)=>handleShowHideModal(status)} 
        content={data} text={text}
        name={name}
        handleSubmit={(query,arrMaxMin)=>handleSubmit(query,arrMaxMin)} 
        queries={queries}
        arrMaxMin={arrMaxMin}
       
       /> :''}
     
    </div>
  )
}

