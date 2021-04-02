import React, { useEffect, useState } from "react";
import AddCar from "../AddCar/AddCar";
import Book from "../Book/Book";
import Car from "../Car/Car";
import { CircularProgress } from "@material-ui/core";

const Home = () => {
  const [products,setProducts] =useState([]);
  const [card,setCard]=useState([]);
  useEffect(()=>{
    fetch(`https://car-dealar.herokuapp.com/products`)
    .then(res=>res.json())
    .then(data=>setProducts(data))
  },[])
  useEffect(()=>{
    fetch(``)
  },[])
  return (
    <div class="container">
      <div class="row"> 
      {products.length === 0 && <CircularProgress></CircularProgress>}
        {products.map((product) => (
          <Car  product={product}></Car>
          ))}
      </div>
    </div>
  );
};

export default Home;
