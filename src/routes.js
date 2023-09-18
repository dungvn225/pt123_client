import { config } from "./config";
import Home from "./pages/Home/Home";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Rental from "./pages/Rental/Rental";
import DetailPost from "./pages/DetailPost/DetailPost";
import LoginLayout from "./layouts/LoginLayout/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout";
import SearchDetail from "./pages/SearchDetail/SearchDetail";
import System from "./layouts/System/System";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostManagement from "./pages/PostManagement/PostManagement";
import EditAcount from "./pages/EditAcount/EditAcount";
import Contact from "./pages/Contact/Contact";
import PostSaved from "./pages/PostSaved/PostSaved";
export const publicRoutes = [
  {
    path: config.routes.Home,
    component: Home,
    layout: DefaultLayout,  
  },
  {
    path: config.routes.CHO_THUE_PHONG_TRO,
    component: Rental,
    layout: DefaultLayout,
  },
  {
    path: config.routes.CHO_THUE_MAT_BANG,
    component: Rental,
    layout: DefaultLayout,
  },

  {
    path: config.routes.CHO_THUE_CAN_HO,
    component: Rental,
    layout: DefaultLayout,
  },

  {
    path: config.routes.NHA_CHO_THUE,
    component: Rental,
    layout: DefaultLayout,
  },
  
  {
    path: config.routes.Login,
    component: Login,
    layout: LoginLayout,
  },
  {
    path:config.routes.Register,
    component:Register,
    layout:RegisterLayout
  },
  {
    path:config.routes.DETAIL_POST,
    component:DetailPost,
    layout:DefaultLayout
  },
  {
    path:config.routes.SEARCH_DETAIL,
    component:SearchDetail,
    layout:DefaultLayout
  },
  {
    path:config.routes.CONTACT,
    component:Contact,
    layout:DefaultLayout
  },
  {
    path:config.routes.POST_SAVED,
    component:PostSaved,
    layout:DefaultLayout
  },

 
  
  
];

export const privateRouter=[
 
  {
    path:config.routes.CREATE_POST,
    layout:System,
    component:CreatePost
  },
  {
    path:config.routes.POST_MANAGE,
    layout:System,
    component:PostManagement
  },
  {
    path:config.routes.EDIT_ACOUNT,
    layout:System,
    component:EditAcount
  },
 
]
