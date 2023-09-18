import {  EDIT_POST, GET_NEW_POST, GET_OUTSTANDING_POST, GET_POSTS, GET_POSTS_LIMIT, GET_POSTS_LIMIT_CURRENT, RESET_DATAEDIT, SAVE_POST } from "../types/postsTypes"

const initState={
    posts:[],
    msg:'',
    count:0,
    newPosts:[],
    outStandingPosts:[],
    isFetching:false,
    postsCurrent:[],
    dataEdit:{},
    postsSaved:JSON.parse(localStorage.getItem('POSTS_SAVE')) || []
    

}

export const postsReducer=(state=initState,action)=>{
 
     switch(action.type){
        case GET_POSTS:
        case GET_POSTS_LIMIT:
            state.posts=action.posts
            state.msg= action.msg || ''
            state.count=action.count || 0
          
            return {...state}
      
        case GET_NEW_POST:
            state.newPosts=action.data;
            
            return {...state}
        case GET_OUTSTANDING_POST:
            state.outStandingPosts=action.data
            return {...state}
        
        case GET_POSTS_LIMIT_CURRENT:
            state.postsCurrent=action.posts;
            state.count=action.count || 0
            return {...state}
        
            case EDIT_POST:
                state.dataEdit=action.data;
                return {...state}
        case RESET_DATAEDIT:
              state.dataEdit={}
              return {...state}
        case SAVE_POST:  //=>xử lý mảng để mảng chứa item có trạng thái true
             
              
               const {post}=action; 
            
               let postsSaved=state.postsSaved;
                
               if(post.like && post.isCLick){
                  const index=postsSaved.findIndex(item=>item.id==post.id);
                
                if(index==-1){
                   postsSaved=[...postsSaved,post];
                }
               }
              else{
                   postsSaved=postsSaved.filter(item=>item.id!==post.id)
               }
               state.postsSaved=postsSaved;
              
              
                localStorage.setItem('POSTS_SAVE',JSON.stringify(state.postsSaved));  //=>mảng chứa item có trạng thái true sẽ lưu trong localStorage
                                                                                       // và khi khởi tạo mảng phải lấy mảng từ localStorage
                                                                                       //và trạng thái click item cũng khởi tạo từ localStorage
               
              
               return {...state}
            
        default:
            return {...state}
     }
}