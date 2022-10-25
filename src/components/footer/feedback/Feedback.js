import React from 'react'
import './Feedback.css'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';




function Feedback() {
  const [form, setForm]=useState({
    name:'',
    email:'',
    content:'',
});
const notify = () => {
  toast.success("Feedback sent");
}



const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const onSubmitForm = e => {
    e.preventDefault();
      axios.post('https://prideserver.herokuapp.com/feedback', form).then(
        (res)=>{
          notify();
        }
      )
      .catch((err)=>{
        notify("Error, try again");
      })
  
  };
  




  return (
    <>
    <div className='feedback'>
        <div className="feedback_container">
        <h3>Leave feedback</h3>
        <form onSubmit={onSubmitForm}>
            <input onChange={onUpdateField} name="name" type="text" placeholder="Name"/>
            <input onChange={onUpdateField} name="email" type="text" placeholder="Email"/>

            <textarea placeholder='Message' onChange={onUpdateField} name="content" id="" cols="30" rows="5"></textarea>
            <div className="send">
                <button  type='submit'>SEND</button>
            </div>
        </form>


        </div>
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

export default Feedback