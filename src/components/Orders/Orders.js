import React, { createContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';

const Orders = () => {
    
    const [bookings, setBookings] = useState([]);
    // const [userLoggedIn, setUserLoggedIn] = useContext(userContext);
    console.log('bk info ',bookings);    
    useEffect(() => {
      fetch("http://localhost:4000/bookings",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        
      })
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }, []);
  

    return (
        <Container>
        <h2>You have {bookings.length} bookings</h2>
        <Row>
            <Col>Product Name</Col>
            <Col>Price</Col>
            <Col>Image</Col>
            <Col>User Name</Col>
            <Col>User Email</Col>
            <Col>Booking Date</Col>
            <Col>Receive Date</Col>
        </Row>
        {bookings.map((bk) => (
          <Row>

            {
                bookings.map(book=>
                    <Row>
                        <Col>{book.name} </Col>
                        <Col>{book.price}</Col>
                        <Col><img src={book.photo} alt=""/> </Col>
                        <Col>{book.name}</Col>
                        <Col>{book.email}</Col>
                        <Col>{book.checkIn}</Col>
                        <Col>{book.checkOut}</Col>
                        <Col>{book.name}</Col>
                    </Row>
                    )
            }
            {bk.name} : {new Date(bk.checkIn).toDateString("dd/MM/yyyy")} to:{" "}
            {new Date(bk.checkOut).toDateString("dd/MM/yyyy")}{" "}
          </Row>
        ))}
        </Container>
  
    );
};

export default Orders;