import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

import "date-fns";

import { useContext } from "react";
import { UserContext, userContext } from "../../App";
import Grid from "@material-ui/core/Grid";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import Bookings from "../Bookings/Bookings";


const Book = () => {
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });
  const handleCheckInDate = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkIn = date;
    setSelectedDate(newDate);
  };

  const handleCheckOutDate = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkOut = date;
    setSelectedDate(newDate);
  };
  const  [loginInUser,setLoginInUser] = useContext(UserContext);
  const handleBooking = () => {
    const newBooking = { ...loginInUser, ...selectedDate,...booking };
    fetch("http://localhost:4000/addBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };


  const  carId  = useParams();
  const idConver= Object.values(carId) 
  const idCapture=idConver[0];
  const [booking, setBooking] =useState([]);

useEffect(()=>{
  fetch(`http://localhost:4000/bookin/${idCapture}`,{
    method:'GET',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify()            
    })
    .then(res=>res.json())
    .then(data=>setBooking(data))

},[])  
   
  return (
    <Container>
        <h2>Checkout</h2>
        <Row>
            <Col>Name</Col>
            <Col>Price</Col>
            <Col>Image</Col>
        </Row>
        <Row>
        {
          booking.map(bk=>
          <Row>
            <Col>{bk.name} </Col>
            <Col>{bk.price} </Col>
            <Col><img style={{width:'200px',margin:'10px',height:'100px'}} src={bk.imageURL} alt=""/> </Col>

            </Row>)

        }
        </Row>


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Booking Date"
            value={selectedDate.checkIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Receive the Car Delivery Date"
            format="dd/MM/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>

        <Button onClick={handleBooking} variant="contained" color="primary">
          Primary
        </Button>
      </MuiPickersUtilsProvider>
          


    </Container>
  );
};

export default Book;
