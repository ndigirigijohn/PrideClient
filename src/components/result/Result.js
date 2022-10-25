import React from 'react'
import './Result.css'
import { useParams } from "react-router-dom";
import Products from '../products/Products';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { useSelector } from "react-redux";


function Result() {
    let params = useParams();
    const products = useSelector((state) => state.products);

    console.log(params)
    console.log(products.length)

  return (
    <div>
        <Navbar/>
        {
            products.length===0?
            <div className="noresult">
                <h3>No results found for "{params.search}"</h3>
            </div>
            :
            <>
                    <div><h3>Search results for "{params.search}"</h3></div>
                    <Products/>

            </>
        }
        <Footer/>

    </div>
  )
}

export default Result