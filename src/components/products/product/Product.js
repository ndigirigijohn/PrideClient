import React from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import './Product.css'
function Product({product}) {
  return (
    <Link to={`/products/${product._id}`} className='product'>
      <div className="image">
      <img src={product.image} alt={product.name}/>
      </div>
      <div className="icon"><BsFillHeartFill/></div>

      <div className='name'><p>{product.name}</p></div>
      <div className="ratings">
      <StarRatings
        rating={2.403}
        starDimension="20px"
        starSpacing="6px"
        starRatedColor="#d42d49"
      />
      </div>

      <div className='price'><p>{product.price} Ksh.</p></div>
            <div className="add"><button>Add to bag</button></div>

          </Link>
  )
}

export default Product