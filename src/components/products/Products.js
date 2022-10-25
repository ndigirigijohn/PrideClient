/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from "react-redux";
import Product from './product/Product';
import './Products.css'

function Products() {
  const products = useSelector((state) => state.products);

  return (
    <div className='products' id='products'>
      {
        products.map((product)=>{
          return <Product key={product._id} product={product}/>
        })
      }
      
    </div>
  )
}

export default Products