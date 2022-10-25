import React from 'react'
import Products from '../products/Products'
import './Account.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
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
    axios.get(`http://localhost:8080/code/a/z/${skincode}`).then((res)=>{
      dispatch(changeProduct(res.data)) ;
      setProductContent(<Products/>)
  
  })
}

  return (
    <div className='user_account'>
      <div className="pride_acc"><h1><Link to='/'>PRIDE</Link></h1></div>
      <div className="user">
        <div className="image">
          <div className="img">
          <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
           alt="Avatar" />


          </div>
        </div>
        <div className="details">
          <p className='name'>{user.username}</p>
          <p className='email'>{user.contact.email}</p>
          <p className='phone'>{user.contact.phone}</p>
        
        </div>

      </div>
      <div className="orders">

      </div>
      <div className="my_products">
        <h3>My products</h3>
        {productContent}
      </div>
      <Footer />


    </div>
  )
}

export default Account