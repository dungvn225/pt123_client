import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './Overview.module.scss';
import Select from '../Address/Select/Select';
import {useSelector} from 'react-redux'
import ReadOnly from '../ReadOnly/ReadOnly';
import Input from '../Input/Input';
import { icons } from '../Icons';
import { apiUploadImages, createNewPostService, updatePostService } from '../../services/postsServices';
import { getCodes } from '../../utils/common/getCodes';
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'
import { getPostsLimitCurrentAction } from '../../redux/actions/postsActions';
import { RESET_DATAEDIT } from '../../redux/types/postsTypes';
import LoadImages from '../LoadImages/LoadImages';

const cx=classNames.bind(styles)
export default function Overview({setPayload,payload,inValidFields,setInvalidFields ,editPost,setEditPost}) {
    const [categoryCode,setCategoryCode]=useState('')
    const [target,setTarget]=useState('');
    const {dataEdit}= useSelector(state=>state.postsReducer);
   
const {categories}=useSelector(state=>state.categoriesReducer);
const {currentData}=useSelector(state=>state.userReducer);
const {prices} =useSelector(state=>state.pricesReducer);
const {areas}=useSelector(state=>state.areasReducer);
 const [isloading,setIsLoading]=useState(false);
const {BsCameraFill,TiDelete}=icons;
const dispatch=useDispatch();


  
  const targets=[
    
    {
        code:'male',
        value:'Nam'
  }, {
    code:'famale',
    value:'Nữ'
},
{
  code:'all',
  value:'Tất cả'
},

]


 useEffect(()=>{
      setPayload(prev=>({...prev,priceCode: getCodes(prices,payload.priceNumber / Math.pow(10,6))}))
 },[payload.priceNumber])

 useEffect(()=>{
  setPayload(prev=>({...prev,areaCode: getCodes(areas,payload.areaNumber)}))
},[payload.areaNumber])



  const handChange=async (e)=>{
      const files=e.target.files;
      const formData = new FormData();
      setIsLoading(true)
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME); 
         const response= await apiUploadImages(formData); 
           if(response.status==200){
         
               setPayload(prev=>({...prev,images:[...prev.images,response?.data?.secure_url]}))
           }
        
      } 
     
      setIsLoading(false)  
      
  }
  

  const handDeleteImage=(image)=>{
        setPayload(prev=>({...prev,images: prev.images.filter(item=>item!==image)}));
  }

  const validate=(payload)=>{
      let invalid=0;
       const  fields=Object.entries(payload);
      
        setInvalidFields(prev=>([]))
        fields.forEach((item)=>{
       
             if(item[1]==''){
              setInvalidFields(prev=>([
                    ...prev,{
                        name:item[0],
                        message:'Bạn ko được để trống trường này!'
                    }
                  ]))
                  invalid++;
                  
             }
             if(item[0]=='address'){
             
                if((item[1].includes('Quận') || item[1].includes('Huyện')) && !item[1].includes('Tỉnh') && !item[1].includes('Thành phố')  || item[1] === '' ){
                  setInvalidFields(prev=>([
                    ...prev,{
                        name: 'provinces',
                        message:'Bạn ko được để trống trường này!'
                    }
                  ]))
                  invalid++;
                }
                if(  (item[1].includes('Tỉnh') || item[1].includes('Thành phố')) && (!item[1].includes('Quận') && !item[1].includes('Huyện'))   || item[1]==''){
                  setInvalidFields(prev=>([
                    ...prev,{
                        name: 'districts',
                        message:'Bạn ko được để trống trường này!'
                    }
                  ]))
                  invalid++;
                }
             }
             if(item[0]=='images' ){
              const images=item[1]
               if(images.length==0){
                setInvalidFields(prev=>([
                  ...prev,{
                    name:item[0],
                    message:'Bạn ko được để trống trường này!'
                  }
                ]))
                invalid++;
               }
             
             }
            
        })
        return invalid;
  };

  const handleSubmit= async()=>{
      validate(payload)
    
      if(validate(payload)==0){
         if(editPost) {
            const data={...payload,postId:dataEdit.id,attributesId:dataEdit.attributesId,imagesId:dataEdit.imagesId,overViewId:dataEdit.overViewId,labelCode:dataEdit.labelCode}
            const response=await updatePostService(data);
           if(response.data.err==0){
            Swal.fire({
              title: 'Thành công',
              text: 'Đã cập nhật bài đăng thành công',
              icon: 'success',
              confirmButtonText: 'ok'
            }).then(()=>{
             
               setEditPost(false) 
              dispatch(getPostsLimitCurrentAction()); 
               dispatch({type:RESET_DATAEDIT}) 
            })
           }
        }else{
           
           const response= await createNewPostService(payload); 
          
         if(response.data.err==0){
          Swal.fire({
            title: 'Thành công',
            text: 'Đã thêm bài đăng thành công',
            icon: 'success',
            confirmButtonText: 'ok'
          }).then(()=>{
           
             setPayload({
              title:  '',
              address: '',
              category:   '',
              categoryCode:'',
              target: '',
              description: '',
              priceNumber: '',
              priceCode: '',
              areaNumber: '',
              areaCode: '',
              images:[] ,
             })
          })
         }else{
          Swal.fire({
            title: 'Oops',
            text: 'Có lỗi gì đó',
            icon: 'error',
           
          })
         }
        }
      }
       
     
     
  }
   
  return (
    <div className={cx('wrapper')}>
         <h4>Thông tin mô tả</h4>
         <Select    label='Loại danh mục' className={cx('category')} 
          categories={categories}
           type={'category'} 
           name={'category'}
          categoryCode={categoryCode}
           setCategoryCode={setCategoryCode}  
           inValidFields={inValidFields}
            setInvalidFields={setInvalidFields}
            editPost={editPost}
            payload={payload}
            setPayload={setPayload}  
        
           />  <br/>

         <Input label={'Tiêu đề'}
           setPayload={setPayload}  
           payload={payload}  
           type={'title'} 
           name={'title'}
           inValidFields={inValidFields}
           setInvalidFields={setInvalidFields}
           />
        <label htmlFor='des'> </label><br/>
        <textarea id='des'  rows='10' cols={'30'}
         onChange={(e)=>{setPayload(prev=>({...prev,description: e.target.value}))}}
          value={payload.description}
          onFocus={()=>setInvalidFields[0]}
         >  </textarea>
         <small>{inValidFields.some(item=>item.name=='description') && inValidFields.find(item=>item.name=='description')?.message} </small>
        <div className={cx('info')}>
        <ReadOnly label={'Thông tin liên hệ'} text={currentData.name || currentData.username} />
        <ReadOnly label={'Điện thoại'} text={currentData.phone}/>
        <Input label={'Giá cho thuê'} 
        unit={'Giá'} 
        setPayload={setPayload}
          payload={payload}
           type={'priceNumber'}
           name={'priceNumber'}
          inValidFields={inValidFields}
          setInvalidFields={setInvalidFields}
         
          /> 
        <br/>  <small className={cx('note')}>Nhập đầy đủ số,ví dụ 1 triệu nhập là 1000000</small> <br/>  <br/>
        <Input label={'Diện tích'} 
        unit={'m2'} 
        setPayload={setPayload} 
         payload={payload}
          type={'areaNumber'}
          name={'areaNumber'}
         inValidFields={inValidFields}
         setInvalidFields={setInvalidFields}
         />
       <Select 
      
       label={'Đối tượng cho thuê'} 
         options={targets}  target={target} 
         setTarget={setTarget}
         inValidFields={inValidFields}
         setInvalidFields={setInvalidFields}
         type={'target'}
         name={'target'}
        setPayload={setPayload}
        payload={payload}
       
       /> 
        </div>
        <h4>Hình ảnh</h4>
        <small className={cx('note')}>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small> <br/>
         
          <label htmlFor='file'   onFocus={()=>setInvalidFields([])}
          className={cx('file')}>
            {isloading? <LoadImages/>: <span> <div><BsCameraFill size={'50px'} color={'#1266dd'}/></div> Thêm ảnh </span> } 
            
          </label>
        <input
         hidden
          type={'file'} id='file' 
           name="files[]" multiple  
            onChange={handChange}
            onFocus={()=>setInvalidFields([])}
            /> 
         
        <div className={cx('imgPreview')}>
            <small>{ (inValidFields.some(item=>item.name=='images') && payload.images.length==0) && inValidFields.find(item=>item.name=='images')?.message } 
            </small> {payload.images.length>0? 'Ảnh đã chọn':''}   <br/> <br/>
              <div className={cx('images')}>
              {payload.images.length>0 && payload.images.map((item,index)=>{
                return <div className={cx('item')} key={index}>
                            <img src={item} key={index} />  
                            <div className={cx('icon')} onClick={()=>handDeleteImage(item)}> <TiDelete size={'20px'}/></div>
                       </div>
              })}
               
              </div>
             
        </div>
      
        <div className={cx('btnCreate')} onClick={()=>handleSubmit()}>{editPost?'Cập nhật': 'Tạo mới'} </div>
        
       
    </div>
  )
}



