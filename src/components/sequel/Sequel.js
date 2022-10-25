import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Products from '../products/Products'

import Info from './info/Info'

function Sequel() {
  return (
    <div>
        <Navbar/>
        <Info/>
        <Products/>
        <Footer/>

    </div>
  )
}

export default Sequel