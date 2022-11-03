import React from 'react'
import Products from '../products/Products'
import './Account.css';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import {BiCube } from 'react-icons/bi';
import {AiOutlineHeart } from 'react-icons/ai';
import {BsPerson } from 'react-icons/bs';
import {AiOutlineLock } from 'react-icons/ai';
import {FiLogOut } from 'react-icons/fi';
import {BiChevronRight } from 'react-icons/bi';
import {CgProductHunt } from 'react-icons/cg';





import axios from 'axios';
import { useDispatch } from "react-redux";
import { changeProduct } from "../../redux/slices/productSlice";


function Account() {
  const dispatch = useDispatch();
  const content1=<div>
    Set your skin code on the FMS page <Link style={{color:"blue", cursor:"pointer"}} to='/fms'>here</Link> to see your products 

  </div>
  const [productContent, setProductContent] = React.useState(content1);

  const user = JSON.parse(localStorage.getItem('user'))
  const skincode=JSON.parse(localStorage.getItem('skincode'))
  if(skincode!==""){
    axios.get(`https://prideserver.herokuapp.com/code/a/z/${skincode}`).then((res)=>{
      dispatch(changeProduct(res.data)) ;
      setProductContent(<Products/>)
  
  })
}

  return (
    <div className='user_account'>
      <Navbar />
      <div className="acc_container">
        <div className="account_header">
        <h2>My account</h2>
        </div>
        <div className="acc_content">
          <div className="acc_nav">
        
            <h4>Welcome back {user.username}</h4>

          
            <div>
              <Link to='/account/orders'><BiCube/><p>Orders</p><BiChevronRight/></Link>
            </div>
            <div>
              <Link to='/account/favorites'><AiOutlineHeart/><p>Favorites</p><BiChevronRight/></Link>
            </div>

            <div>
              <Link to='/account/personaldata'><BsPerson/><p>Personal data</p><BiChevronRight/></Link>
            </div>

            <div>
              <Link to='/account/password'><AiOutlineLock/><p>Change password</p><BiChevronRight/></Link>
            </div>
            <div>
              <Link to='/account/mysupplements'><CgProductHunt/><p>My supplements</p><BiChevronRight/></Link>
            </div>

            <div>
              <Link
              onClick={()=>{
                localStorage.removeItem('user')
                localStorage.removeItem('skincode')
              }}
               to='/auth/login'><FiLogOut/><p>Sign out</p><BiChevronRight/></Link>
            </div>




          </div>
          <div className="acc_contents">
            <Outlet index/>

          </div>
        </div>



      </div>
    </div>
  )
}

export default Account