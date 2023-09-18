import React, { useEffect } from "react";
import styles from "./LoginLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import Menu from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
const cx = classNames.bind(styles);
export default function LoginLayout({ children }) {
  useEffect(()=>{
    window.scrollTo(0,0)
   })
        
  return (
    <div className={cx("wrapper")}>
      <Header />
      <Menu />

      {children}
      <Footer />
    </div>
  );
}
