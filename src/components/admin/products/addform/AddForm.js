import React from 'react'
import './AddForm.css'
import { useState } from 'react'
import axios from 'axios';


function AddForm({action,classname}) {
    const initialForm = {
        name:"",
        price:"",
        image:"",
        description:"",
        category:"",
        identifier:""
    }
    const [form, setForm]=useState(initialForm);
    const handleChange = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
      };
      const [disabled, setDisabled] = useState(false)
    //   const disable=()=> {
    //     console.log("enabling")

    //     setDisabled(true)
    //     console.log(disabled)      

    //   }
    //   const enable=()=>{
    //     setDisabled(false)
    //   }

      const submitProduct=(e)=> {

        e.preventDefault();
        setDisabled(true)

        // alert(disabled)
        axios.post('https://prideserver.herokuapp.com/',form).then((res)=>{
            alert(JSON.stringify(res.data))
            setForm(initialForm)
        })
        .catch((err)=>{
            JSON.stringify(err)
    }).finally(()=>{
        setDisabled(false)
    })



      }
    
  return (
    <form onSubmit={(e)=>submitProduct(e)} className={classname}>
        <div className="close_form">
            <button onClick={(e)=>{
                e.preventDefault()
                action()}} >X</button>
        </div>
        <div className="addform_heading">
            <h5>Add product</h5>

        </div>
        <div>
            <input name='name' onChange={handleChange} placeholder='Product Name' type="text" />
        </div>
        <div>
            <input name='price' onChange={handleChange} placeholder='Price' type="number" />
        </div>
        <div>
            <input name='identifier' onChange={handleChange} placeholder='Identifier' type="text" />
        </div>
        <div>
            <input name='image' onChange={handleChange} placeholder='Image url' type="text" />
        </div>
        <div>
            <input name='category' onChange={handleChange} placeholder='Category' type="text" />
        </div>
        <div>
            <textarea onChange={handleChange} placeholder='Product description' name="description" id="product_description" cols="40" rows="5"></textarea>
        </div>
        <div className="submit_product">
            <button  style={disabled?{opacity:0.5}:{opacity:1}} disabled={disabled} type='submit'>Continue</button>
        </div>

        
        </form>
  )
}

export default AddForm