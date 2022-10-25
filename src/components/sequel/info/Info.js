import React from 'react'
import './Info.css'

function Info() {
  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <div className='info_head' ><h1>Hello {user.username}, the following products are suitable for your skin </h1></div>
  )
}

export default Info