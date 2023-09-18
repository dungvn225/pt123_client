import { TOKEN } from "../../utils/settings/config"

const {  REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL ,LOGOUT} = require("../types/authTypes")


const initState={
    token:null,
    msg:'',
    isRegister:false,
    update: false,

    isLogin:localStorage.getItem(TOKEN)?true:false,   
}


export const authReducer=(state=initState,action)=>{
    
    switch(action.type){
        case REGISTER_SUCCESS:
             state.token= action.data 
             state.msg=''
             state.isRegister=true
             state.update = !state.update
            
            return {...state}
        case REGISTER_FAIL:
            state.token=null;
          
            state.msg=action.msg
            state.isRegister=false
            state.update = !state.update
          
            return {...state}



            case LOGIN_SUCCESS:
             state.token= action.data 
             state.msg=''
            
             state.update = !state.update
             localStorage.setItem(TOKEN, JSON.stringify(action.data)) 
             state.isLogin=true
            
            return {...state}
            
        case LOGIN_FAIL:
            state.token=null;
          
            state.msg=action.msg
            state.isLogin=false
            state.update = !state.update
         
            return {...state}

        case LOGOUT:
             state.isLogin=false;
             localStorage.removeItem(TOKEN);
             return {...state}
        default :
           
        return {...state}
    }
}