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
import Orders from './components/Account/sections/Orders';
import Favorites from './components/Account/sections/Favorites';
import PersonalData from './components/Account/sections/PersonalData';
import Password from './components/Account/sections/Password';
import MySupplements from './components/Account/sections/MySupplements';
import OrdersA from './components/admin/orders/Orders';
import Offers from './components/admin/offers/Offers';
import Products from './components/admin/products/Products';
import Customers from './components/admin/customers/Customers';
import Stock from './components/admin/stock/Stock';
import Dashboard from './components/admin/dashboard/Dashboard';
function App() {
  const dispatch = useDispatch();
  const url=`https://prideserver.herokuapp.com/all/random`
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
        <Route path='/admin' element={<Admin/>}>
          <Route path='/admin/dashboard' index element={<Dashboard/>}/>
          <Route path='/admin/orders' element={<OrdersA/>}/>
          <Route path='/admin/customers' element={<Customers/>}/>
          <Route path='/admin/products' element={<Products/>}/>
          <Route path='/admin/offers' element={<Offers/>}/>
          <Route path='/admin/stock' element={<Stock/>}/>          
        </Route>
        <Route path='/fms' element={<FMS/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/account' element={<Account/>}>
          <Route index path='/account/orders' element={<Orders/>}/>
          <Route path='/account/favorites' element={<Favorites/>}/>
          <Route path='/account/personaldata' element={<PersonalData/>}/>
          <Route path='/account/mysupplements' element={<MySupplements/>}/>
          <Route path='/account/password' element={<Password/>}/>
        </Route>
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
