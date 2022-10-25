import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useDispatch, } from "react-redux";
import { changeProduct } from "../../../redux/slices/productSlice";
import './Filter.css'
import { AiFillFilter } from 'react-icons/ai';



function Filter() {
  const dispatch = useDispatch();
   const [filters, setFilters] = useState([]);

   useEffect(
    ()=>{
      if(filters.length===0){
        axios.get('http://localhost:8080/1/10').then((response)=>{
          dispatch(changeProduct(response.data)) 
        })
      }
      axios.post('http://localhost:8080/filters/categories',{categories:filters}).then(
        (response)=>{
          console.log(response)
          
          dispatch(changeProduct(response.data))  
        }
      )

    }, [dispatch, filters])

   const pushFilters=(filter)=>{
      if(filter==='all'){
        setFilters([])
        return
      }
        if(!filters.includes(filter)){
          setFilters([...filters, filter])
        }
   }

const popFilter=(filter)=>{
  setFilters(filters.filter((item)=>item!==filter))

}
  return (
    <div className='filter'>
        <div className="filter_container">
            <div className="filter_left"> 
            

            <select  onChange={(e)=>{
              pushFilters(e.target.value)
            }} 
              className='select'>
            <option value='all'>Filter</option>
            <option value="moisturizers">Moisturizers</option>
            <option value="cleansers">Cleansers</option>
            <option value="facemasks">Face Masks</option>
            <option value="toners">Toners</option>
            <option value="combo">Combo</option>
            </select>
        
            <AiFillFilter/>

            </div>
            <div className="filter_right">
              {
                filters.map((filter, index)=>(
                  <div className="item" key={index}>
                    <div className="value">
                      <p>{filter}</p>

                    </div>
                    <p className="vert"></p>
                    <div onClick={()=>{popFilter(filter)}} className="close_x"><p>X</p></div>
                    </div>
                ))
              }
                
            </div>
        </div>
    </div>
  )
}

export default Filter