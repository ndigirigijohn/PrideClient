import React, { useEffect } from 'react'
import Footer from '../footer/Footer'
import './Cart.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, } from "react-redux";
import { changeCart } from "../../redux/slices/cartSlice";
import { changeCount } from "../../redux/slices/countSlice";

import { useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

function Cart() {
  let userCode=JSON.parse(localStorage.getItem('skincode'))
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal]= useState(0)
  const [itemsCount, setItemCount]= useState(0)
  const [pop, setPop]= useState('pop_none')
  const[processing, setProcessing]= useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const [userItems, setUserItems]= useState([])
  const [name, setName]= useState('none')
  
  const notify = (err) => {
    if(err===""){

    }
    else

    toast.success(err);

}



useEffect(()=>{
  let items=cart;
  setTotal(0)
  let i =0;
  let tot=0
  let count=0
  for(i;i<items.length;i++){
      tot=tot+items[i].count*items[i].price
      count=count+items[i].count

  }
  setTotal(tot)
  setItemCount(count)
  dispatch(changeCount(count))


  if(userCode!=="" && userCode!==null){
    axios.get(`https://prideserver.herokuapp.com/p/codes/g/${userCode}`).then((res)=>{
      console.log(res.data.products)
      setName("show")
      setUserItems(res.data.products)
    }).catch((err)=>{
      console.log(err)
    })

  }


},[cart, dispatch, userCode])

  const increment=(id,count )=>{
    const items=cart
    const newItems=items.map(item=>{
      if(item.id===id){
        return {...item, count: item.count+1}
      }
      return item
    })
    dispatch(changeCart(newItems))
  }
  const decrement=(id,count )=>{
    const items=cart
    const newItems=items.map(item=>{
      if(item.id===id){
        if(count>1){
          return {...item, count: item.count-1}

        }
      }
      return item
    })
    dispatch(changeCart(newItems))
  }
  const remove = (id)=>{
    const items=cart
    dispatch(changeCart(items.filter(item=>item.id!==id)))
  }
  
  const removeAll = ()=>{
    dispatch(changeCart([]))
  }

const shipping=30;
console.log(cart)


const handleCheckout=()=>{
  if(user===null){
    setPop('pop_show')
    return
  }
  else if(processing){
    notify("Your order is being processed")
    return
  }
  const order={
    "userId":user._id,
    "name":user.name,
    "phone":user.contact.phone,
    "email":user.contact.email,
    "count":itemsCount,
    "shipping":shipping,
    "total":total,
    "items":cart
}

  notify("Your order is being processed")
  axios.post('https://prideserver.herokuapp.com/orders/makeorder', order).then(res=>{
    notify("Your order was placed succesfully");
    dispatch(changeCart([]))
    setProcessing(false)
  }).catch(err=>{
    console.log(err)
    notify("Something went wrong, try again later")
  })
  console.log(order)

}

  return (
    <>
    <div className='cart_container'>
      {
        cart.length===0?
          <div className="cart_empty">
          <p>Empty</p>
          <p className='back' onClick={()=>{
            navigate(-1)
          }}><AiOutlineArrowLeft/> Go back</p>

          

        </div>
        :
        <div className='shopping_cart'>
          <div className="cart_items">
            <div className="items_head">
              <h3>Shopping cart</h3>
              <p>{itemsCount} Items</p>
            </div>
            <p className="line"></p>
            <div className="items_body">
            <div className='cart_item'>
                    <div className="_image">
                      <p>Image</p>

                    </div>
                    <p>Name</p>
                    <div className="values">
                  <p>Count</p>
              </div>
              <p className='price'>
             <p>Price</p>
              </p>
              <p className='total'>Total</p>
              <p className={name}>Matching</p>
              <button onClick={()=>{
                removeAll()
              }} className='remove remove_all'>Remove all</button>


                  </div>

              {
                cart.map((item)=>{
                  return <div key={item.id} className='cart_item'>
                    <div className="image">
                    <img src={item.image} alt={item.name} />

                    </div>
                    <p>{item.name}</p>
                    <div className="values">
                <button onClick={
                  ()=>{
                    increment(item.id, item.count)
                  }
                }  className="rm">
                    +
                </button>
                <input onChange={(e)=>{
                }} value={item.count} type={'number'} />
                <button onClick={()=>{
                  decrement(item.id, item.count)
                }} className="add">
                    -
                </button>
              </div>
              <p className='price'>
              {item.price}
              </p>
              <p className='total'>{item.price*item.count}</p>
              <p style={userItems.includes(item.identifier)?{color:"green"}:{"color":"red"}} className={name}>{userItems.includes(item.identifier)?"Matched":"Mismatched"}</p>
              <button onClick={()=>{
                remove(item.id)
              }} className='remove'>Remove</button>


                  </div>
                })
              }
            </div>
            <div className="continue">
            <p className=''  onClick={()=>{
            navigate(-1)
          }}><AiOutlineArrowLeft/> Continue to shopping</p>


            </div>

          </div>
          <div className="order">
            <h3>Order Summary</h3>
            <p className="line"></p>
            <div className="summary">
              <div className="items_total">
                <span>ITEMS {itemsCount} </span>
                <span>KSH {total}</span>

              </div>
              <div className="shipping">
                <span>SHIPPING</span>
                <span>KSH {shipping}</span>
              </div>
              <div className="total_cost">
                  <span>TOTAL COST</span>
                  <span>KSH {total+shipping}</span>
              </div>
              <button onClick={()=>{
                handleCheckout()
              }} className='checkout'>PROCEED TO PAY</button>
            </div>

          </div>
        </div>
      }
        <Footer/>
    </div>
    <div className={pop}>
      <h3>Please log in to continue</h3>
      <button className='' onClick={()=>{navigate('/auth/login')}}>Login</button>

    </div>
    <ToastContainer
    className={'toast'}
        style={{width:"300px", height:"50px"}}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        </>

  )
}

export default Cart