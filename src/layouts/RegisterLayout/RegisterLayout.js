import React, { useEffect } from "react";
import styles from "./RegisterLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import Menu from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
const cx = classNames.bind(styles);
export default function RegisterLayout({ children }) {
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
