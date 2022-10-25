import './Main.css';

import React from 'react'
import Navbar from '../navbar/Navbar'
import CarouselRender from './carousel/CarouselRender';
import Footer from '../footer/Footer'
import Products from '../products/Products'
import Filter from './filter/Filter'

function Main() {
  return (
    <div className='main'>
        <Navbar/>
        <CarouselRender/>
        <Filter/>
        <Products/>
        <Footer/>

    </div>
  )
}

export default Main