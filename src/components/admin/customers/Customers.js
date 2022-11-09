import React from 'react'
import AdminNav from '../adminnav/AdminNav'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Customers.css'
import AddSearch from '../addsearch/AddSearch';


function Products() {
  const [customers, setCustomers] = useState([])
  useEffect(()=>{

    axios.get(`https://prideserver.herokuapp.com/users/get/all`).then((res)=>{
      console.log('Customers', res.data)
      setCustomers(res.data)
    })
  },[])

  const addCustomer=()=>{
    alert('add Customer')
  }
  const searchCustomer=(e)=>{
    console.log(e.target.value)
    axios.get(`https://prideserver.herokuapp.com/users/find/byname/${e.target.value}`).then((res)=>{
      console.log('connected', res.data)
      setCustomers(res.data)
    })
  }


  return (
    <div className='admin_customers'>
             <AdminNav title={'Customer'}/>
             <AddSearch title={'customer'} addAction={addCustomer} searchAction={searchCustomer}/>
             <div className="admin_customer_head">
                <div className="name">
                  Username
                </div>
                <div className="phone">
                  Phone
                </div>
                <div className="email">
                  Email
  
                </div>
                <div className="category">
                  skincode
  
                </div>
                <div className="edit">
                Edit
                </div>
                <div className="rm">
                Remove
                </div>
               </div>

             {
              customers.map((user)=>{
                return             <div className="admin_customer">
                <div className="name">
                  {user.username}
                </div>
                <div className="phone">
                  {user.contact.phone}
                </div>
                <div className="email">
                  {user.contact.email}
  
                </div>
                <div className="category">
                  {user.skincode}
  
                </div>
                <div className="edit">
                  <button>Edit</button>
                </div>
                <div className="rm">
                  <button>Remove</button>
                </div>
               </div>
  
              })
             }
             

    </div>
  )
}

export default Products