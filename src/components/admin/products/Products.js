import React, { useEffect } from 'react'
import AdminNav from '../adminnav/AdminNav'
import { useState } from 'react';
import './Products.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import AddSearch from '../addsearch/AddSearch'
import AddForm from './addform/AddForm';


function Products() {
  let page=1;
  let limit=10;
  const [classname, setClassname]=useState('none')

  const [products, setProducts] = useState([])
  useEffect(()=>{

    axios.get(`https://prideserver.herokuapp.com/byPage/${page}/${limit}`).then((res)=>{
      console.log('connected', res.data)
      setProducts(res.data)
    })
  },[page, limit])
  const addProductClick=(e)=>{

    classname==='none'?setClassname('add_form'):setClassname('none');
  }
  const searchProduct=(e)=>{
    console.log(e.target.value)
    axios.get(`https://prideserver.herokuapp.com/products/search/${e.target.value}`).then((res)=>{
      console.log('connected', res.data)
      setProducts(res.data)
    })
  }

  return (
    <>
     <AdminNav title={'Products'}/>
     <AddSearch title={'product'} addAction={addProductClick} searchAction={searchProduct}/>

    <div className='admin_products'>
             <div className="admin_product_head">
              <div className="product_img">
                Image
              </div>
              <div className="name">
                Name
              </div>
              <div className="identifier">
                Identifier
              </div>
              <div className="price">
                Price

              </div>
              <div className="category">
                Category

              </div>
              <div className="edit">
                Edit  
              </div>
              <div className="rm">
                remove
              </div>
             </div>
             {
              products.map((product)=>{
                return              <div className="admin_product">
                <div className="product_img">
                  <img src={product.image} alt="" />
                </div>
                <div className="name">
                  <Link to=''>
                  {product.name}

                  </Link>
                </div>
                <div className="identifier">
                  {product.identifier}
                </div>
                <div className="price">
                  {product.price}
  
                </div>
                <div className="category">
                  {product.category}
  
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
    <AddForm action={addProductClick} classname={classname}/>
    </>

  )
}

export default Products