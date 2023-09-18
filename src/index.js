import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobleStyles from './components/GlobleStyles/GlobleStyles';
import { rootReducer } from './redux/reducer/rootReducer';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {createStore,applyMiddleware} from 'redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const store=createStore(rootReducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
   <GlobleStyles>
    <Provider store={store}>
   <App />
    </Provider>
     
   </GlobleStyles>
  

);

reportWebVitals();
