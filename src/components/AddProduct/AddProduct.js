import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL,setImageURL] =useState(null);
  
  const onSubmit = data =>{
      const eventData={
          name: data.name,
          price:data.price,
          imageURL:imageURL
      }
      const url=`https://car-dealar.herokuapp.com/addProduct`;
      fetch(url , {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(eventData)
      })
      .then(res=>console.log('data to the send '))
      console.log(data)
  };
  const handleImageChange=event=>{
      console.log(event.target.files[0]);
      const imageData=new FormData();
      imageData.set('key','a6aa0479e281ae16b8c911cfa40f02bd')
      imageData.append('image',event.target.files[0])

      axios.post('https://api.imgbb.com/1/upload',imageData)
        .then(function (response) {
          console.log('image data url  ',response.data.data.display_url);
          setImageURL(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
      


  }

  return (
    <Container>
  

      <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue="Aston Martin" ref={register} />      
      <input name="price" defaultValue="1200" ref={register} />      
      <input name="exampleRequired" type="file" onChange={handleImageChange} />
      
      <input type="submit" />
    </form>

    </Container>
  );
};

export default AddProduct;
