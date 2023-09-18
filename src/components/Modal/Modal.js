import React, { useEffect, useState } from 'react'
import styles from './Modal.module.scss';
import className from 'classnames/bind';
import { icons } from '../Icons';
import { getNumbersFromString } from '../../utils/common/getNumbersFromString';
import { addMinMax } from '../../utils/common/getCodes';
const cx=className.bind(styles);
export default function Modal({content,name,handleShowHideModal,handleSubmit,queries,arrMaxMin,text}) {
   
  
  const [percent1,setPercent1]=useState((name=='price' && arrMaxMin?.arrMaxMin?.pricesArr) ? +arrMaxMin?.arrMaxMin?.pricesArr[0]: (name=='area' && arrMaxMin?.arrMaxMin?.areasArr)? +arrMaxMin?.arrMaxMin?.areasArr[0]:0);
  const [percent2,setPercent2]=useState((name=='price' && arrMaxMin?.arrMaxMin?.pricesArr)?  +arrMaxMin?.arrMaxMin?.pricesArr[1]: (name=='area' && arrMaxMin?.arrMaxMin?.areasArr)? +arrMaxMin?.arrMaxMin?.areasArr[1]:100);
  const [activeEl,setActiveEl]=useState('');
   const [code,setCode]=useState(content[0].code );
  
   
  addMinMax(content);
 
   useEffect(()=>{
    const activeSliderEl_Width=100-percent1 -(100-percent2)>0   ?  100-percent1 -(100-percent2)   :   -1*(100-percent1 -(100-percent2)) 
   
    const activeSliderEl= document.querySelectorAll('.Modal_slider-Track-active__1F16W') ;

      if(activeSliderEl.length>0 ){
      
      
     if(percent2-percent1>0){
      activeSliderEl[0].style.left=`${percent1}%` 
      activeSliderEl[0].style.right=`${100- percent2}%` 
      activeSliderEl[0].style.width=`${activeSliderEl_Width}% ` 
     }else{
      activeSliderEl[0].style.left=`${percent2}%` 
      activeSliderEl[0].style.right=`${100- percent1}%` 
      activeSliderEl[0].style.width=`${activeSliderEl_Width}% ` 
     }
    }
   },[percent1,percent2])






  
    const {HiOutlineArrowLeft} =icons;
      const handleChecked=(e)=>{
     
     
      }
  if(name=='province'.trim() || name=='category'.trim()){   return (
    <div className={cx('wrapper')} >
         <div className={cx('overlay')} onClick={()=>handleShowHideModal(false)}></div>  
         <div className={cx('content')} >   
             <div className={cx('header')}> <HiOutlineArrowLeft  onClick={()=>handleShowHideModal(false)}/></div>
             <div className={cx('body')}  >
                               <div> 
                                 <input
                                   id={'default'}
                                  type={'radio'} defaultValue={text} 
                                  checked={!queries[`${name}Code`]?true:false} 
                                  onChange={(e)=>handleChecked(e)} 
                                  onClick={()=>handleSubmit({[name]:text,[`${name}Code`]:null})}
                                  /> <label htmlFor={'default'}>{text}</label> </div>


                 {content.length>0 && content.map((item,index)=>{  
                      return  <div key={index}> 
                                 <input
                                   id={item.code}
                                  type={'radio'} defaultValue={item.code} checked={item.code==queries[`${name}Code`]} 
                                  onChange={(e)=>handleChecked(e)} 
                                  onClick={()=>handleSubmit({[name]:item.value,[`${name}Code`]:item.code})}  
                                  /> <label htmlFor={item.code}>{item.value}</label> </div>     
                 })}
                  
             </div>
         </div>
    </div>
  )}else{

     const handleClickTack=(e,value)=>{
         
        const trackEl=document.getElementById('slider-Track');
        const trackRect=trackEl.getBoundingClientRect();
      
          
        const percent=(value||value==0)? value : Math.round( (e.clientX - trackRect.x) * 100  / trackRect.width);   
      
        
        if(Math.abs(percent-percent1) <= Math.abs(percent-percent2)){ 
              setPercent1(percent)
        }else{
          setPercent2(percent)
        }
        
        
     }
    
     const convert100toTarget=(percent)=>{
   
      
       if( name=='price'){
         
          let number=parseFloat((Math.round((+percent/100 * 15)/0.5) *0.5).toFixed(1));  
          
        return  number%2==0 ? parseInt(number): number;

        
       }else if(name=='area'){
          
        let number=parseFloat((Math.round((+percent/100 * 90)/0.5) *0.5).toFixed(1));  
    
        return  number%2==0 ? parseInt(number): number;
       
       }
       
     }

     const convertTargetto100=(number)=>{
     
    
     if(name=='price'){
   
    
      return  ( number/15 * 100) 
                  
     }else{
      return  ( number/90 * 100)
     }
     
     
  }

  const handlePrice=(item)=>{
    setActiveEl(item.code)   
    let arrMaxMin=getNumbersFromString(item.value);
    if(arrMaxMin.length==1){
      if(arrMaxMin[0]==1){
        setPercent1(0);
        setPercent2(convertTargetto100(1))
      }
      if(arrMaxMin[0]==15){
        setPercent1(100);
        setPercent2(100)
      }
    
      if(arrMaxMin[0]==20){
        setPercent1(0);
        setPercent2(convertTargetto100(20))
      }
      if(arrMaxMin[0]==90){
        setPercent1(100);
        setPercent2(100)
      }
     
       
    }else{
      setPercent1(convertTargetto100(arrMaxMin[0]));
      setPercent2(convertTargetto100(arrMaxMin[1]))
    }

  }
  
  if(+percent1<+percent2) {
    text='từ '+convert100toTarget(percent1)+' - '+convert100toTarget(percent2)+`${name=='price'?' triệu':' m'}`
} 
if(+percent1>+percent2) {
text= 'từ '+convert100toTarget(percent2)+' - '+convert100toTarget(percent1)+`${name=='price'?' triệu':' m'}`
}
if(+percent1==+percent2 && +percent1==100) {
 text=    `trên ${convert100toTarget(percent2)} ${name}=='price'?' triệu':' m`
}

           
   const  handlePercentToString=(percent1,percent2)=>{
    let text='';
    if(+percent1<+percent2) {
     text='từ '+convert100toTarget(percent1)+' - '+convert100toTarget(percent2)+`${name=='price'?' triệu':' m'}`
} 
if(+percent1>+percent2) {
 text= 'từ '+convert100toTarget(percent2)+' - '+convert100toTarget(percent1)+`${name=='price'?' triệu':' m'}`
}
if(+percent1==+percent2 && +percent1==100) {
  text=  'trên ' +convert100toTarget(percent2)+ `${name=='price'?' triệu':' m'}`
}

    return text
   }
     const handleBeforeSubmit=()=>{ 
     const text=  handlePercentToString(percent1,percent2)
     const arrMaxMin=  getNumbersFromString(text);

     
        if(percent1==100 && percent2==100){
             arrMaxMin.push(9999)
        }
        
      
      handleSubmit({ 
                      
        [`${name}Number`]: arrMaxMin, 
        [name]:text
      },{
         [`${name}Arr`]:[percent1,percent2]
      }
      )
     }
    
     return (
      <div className={cx('wrapper')} >
         <div className={cx('overlay')} onClick={()=>handleShowHideModal(false)}></div>  
         <div className={cx('content')} >   
             <div className={cx('header')}> <HiOutlineArrowLeft style={{cursor:'pointer'}} onClick={()=>handleShowHideModal(false)}/></div>
             <div className={cx('body')}  >
                <div style={{position:'relative',height:'40px',display:'flex',alignItems:'center',margin:'20px 0px'}}>
                    <div className={cx('price-range')}>
                    {handlePercentToString(percent1,percent2)}
                   
                    
                    </div>
                   <input className={cx('input-range')} type={'range'} min='0' max={'100'} step='1' value={percent1} onChange={(e)=>{setPercent1(e.target.value);setActiveEl('')}}/>
                   <input className={cx('input-range')} type={'range'} min='0' max={'100'} step='1' value={percent2} onChange={(e)=>{setPercent2(e.target.value);setActiveEl('')}}/> 
                   <div className={cx('slider-Track')} id='slider-Track' onClick={(e)=>handleClickTack(e)} style={{cursor:'pointer'}}></div>                                                                             
                   <div className={cx('slider-Track-active')} onClick={(e)=>handleClickTack(e)} style={{cursor:'pointer'}} ></div>
                   <div className={cx('first-point')} onClick={(e)=>handleClickTack(e,0)} style={{cursor:'pointer'}}> 0 </div> 
                   <div className={cx('end-point')} onClick={(e)=>handleClickTack(e,100)} style={{cursor:'pointer'}}>15triệu+ </div>

                </div>
                <div style={{display:'flex',flexWrap:'wrap',margin:'60px 0px'}}>
                {content.length>0 && content.map((item,index)=>{
                    const active= activeEl ==item.code?  {background: 'blue',color:'white'}: {}
                     return <div 
                     style={{padding:'10px',background:'#80808069',margin:'10px',borderRadius:'4px',cursor:'pointer',...active}} 
                     key={index}
                     onClick={()=>handlePrice(item)}
                     >
                       {item.value} </div>
                })}
                </div>
               <div
                style={{background:'var(--orange-color',width:'100%',color:'white',textAlign:'center',padding:'10px 0px',cursor:'pointer'}}
                   onClick={()=>handleBeforeSubmit()}
                >
                  Áp dụng
                  </div>
                  
             </div>
         </div>
    </div>
    )
  }
}

