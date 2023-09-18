import {combineReducers} from 'redux'
import { authReducer } from './authReducer'
import {postsReducer} from './postsReducer'
import { categoriesReducer } from './categoriesReducer'
import { pricesReducer } from './pricesReducer'
import { areasReducer } from './areasReducer'
import { provinceReducer } from './provinceReducer'
import { userReducer } from './userReducer'
import { loadingReducer } from './loadingReducer'
export const rootReducer=combineReducers({
    authReducer,
    postsReducer,
    categoriesReducer,
    pricesReducer,
    areasReducer,
    provinceReducer,
    userReducer,
    loadingReducer
})