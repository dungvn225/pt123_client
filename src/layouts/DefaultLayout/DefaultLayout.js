import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Navigation from "../../components/Navigation/Navigation";
import Search from "../../components/Search/Search";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { pricesAction } from "../../redux/actions/pricesActions";
import { getAreasAction } from "../../redux/actions/areasActions";
import { getNewPostAction, getOutstandingPostAction } from "../../redux/actions/postsActions";
import { getProvinceAction } from "../../redux/actions/provinceActions";
import { getCurrentAction } from "../../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import { config } from "../../config";

const cx = classNames.bind(styles);
export default function DefaultLayout({ children }) {
  const location=useLocation();
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pricesAction());
    dispatch(getAreasAction());
    dispatch(getNewPostAction());
    dispatch(getOutstandingPostAction())
    dispatch(getProvinceAction());
  }, []);
  const {isLogin} =useSelector(state=>state.authReducer);
  useEffect(()=>{
 
  isLogin &&  dispatch(getCurrentAction())
 },[])

 useEffect(()=>{
    window.scrollTo(0,0)
 },[location]) 
  return (
    <div className={cx("wrapper")}>
      <Header />
      <Navigation />
       {location.pathname!==config.routes.CONTACT && <Search />  }
      <div className={cx("content")}> {children}</div>
      <Footer />
    </div>
  );
}
