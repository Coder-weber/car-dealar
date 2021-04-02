import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import addManage from "./addManage";

const Manage = () => {
  const [products, setProducts] = useState([]);
  console.log('product see ',products);
  useEffect(() => {
    fetch(`https://car-dealar.herokuapp.com/products`)
      .then((res) => res.json())
      .then((data) =>setProducts(data));
  }, []);
  const handleDelete=(productId)=>{
    
    fetch(`https://car-dealar.herokuapp.com/deleteProduct/${productId}`,{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify()
    })
    .then(res=>res.json())
    .then(data=>console.log('delete data ',data))
    }  
  return (
    <Container>
    <Row>
        <Col>Name</Col>
        <Col>Price</Col>
        <Col>Image</Col>
        <Col>Action</Col>
    </Row>
    <Row>
        {
            products.map(product=>
                <Row>
                <Col>{product.name} </Col>
                <Col>{product.price} </Col>
                <Col><img style={{width:'100px',margin:'10px',height:'50px'}} src={product.imageURL} alt=""/> </Col>
                <Col><button onClick={()=>handleDelete(product._id)}>Delete</button> </Col>
                </Row>
            )
        }
    </Row>
     </Container>
  );
};

export default Manage;
