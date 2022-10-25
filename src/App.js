import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Main from './components/main/Main';
import Admin from './components/admin/Admin';
import FMS from './components/FMS/FMS';
import Cart from './components/cart/Cart';
import Account from './components/Account/Account';
import Sequel from './components/sequel/Sequel';
import ProductPage from './components/products/productPage/ProductPage';
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, } from "react-redux";
import { changeProduct } from "./redux/slices/productSlice";
import Auth from './components/auth/Auth';
import Login from './components/auth/login/Login';
import SignUp from './components/auth/signup/SignUp';
import Result from './components/result/Result';


function App() {
  const dispatch = useDispatch();
  const url=`https://prideserver.herokuapp.com/1/9`
  const getProducts= axios.get(url)
  useEffect(()=>{
    dispatch(changeProduct([]));
    getProducts.then((response)=>{
      dispatch(changeProduct(response.data))  
    })
    .catch((err)=>{
      console.log(err)

    });;


  });


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/fms' element={<FMS/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/account' element={<Account/>} />
        <Route path='/sequel' element={<Sequel/>}/>
        <Route path='/result/:category/:search' element={<Result/>}/>

        <Route path='/products/:id' element={<ProductPage/>}/>
        <Route path='/auth' element={<Auth/>}>
          <Route index path='/auth/login' element={<Login/>}/>
          <Route path='/auth/signup' element={<SignUp/>}/>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
