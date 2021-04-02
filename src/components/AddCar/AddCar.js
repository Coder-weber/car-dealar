import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Book from "../Book/Book";

const AddCar = ({ product }) => {

  const history=useHistory();
    const handleBuy=(id)=>{
      if(id== product._id){
        fetch('https://car-dealar.herokuapp.com/addBooking',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>console.log('data send ',data))
        
      }
      else{
        console.log('no id value');
      }
  
    }
    
    return (
    <div class="col-md-4">
      <img
        style={{ width: "300px", padding: "5px" }}
        src={product.imageURL}
        alt=""
      />
      <p>{product.name}</p>
      <div className="row">
        <div className="col-md-6">Price: {product.price}</div>
        <div className="col-md-6">
        <button onClick={()=>handleBuy(product._id)}>
          <Book product={product.name}></Book>
          Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
