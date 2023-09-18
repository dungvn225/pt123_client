import React, { Fragment } from "react";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes,privateRouter } from "./routes";
import System from './layouts/System/System'
function App() {
 
  return (
    <div className="App">
         
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            const Page = route.component;
            if (route.layout) {
               Layout=route.layout
            } else if(route.layout===null) {
              Layout = Fragment;
            }
            return (
              <Route
                    key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                exact
              />
            );
          })}
          {privateRouter.map((route,index)=>{
              let Layout=System;
              const Page=route.component;
             
              if(route.layout){
               Layout=route.layout;
              } else if(route.Layout==null){
                  Layout=route.layout
              }
             return <Route path={route.path} element={<Layout> <Page/></Layout>} exact key={index}/>
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
