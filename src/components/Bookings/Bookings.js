import React, { useEffect, useState } from 'react';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    // const [userLoggedIn, setUserLoggedIn] = useContext(userContext);
    
    useEffect(() => {
      fetch("https://car-dealar.herokuapp.com/bookings",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        
      })
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }, []);
  
    return (
        <div>
        <h2>You have {bookings.length} bookings</h2>
        {bookings.map((bk) => (
          <li>
            {" "}
            {bk.name} from: {new Date(bk.checkIn).toDateString("dd/MM/yyyy")} to:{" "}
            {new Date(bk.checkOut).toDateString("dd/MM/yyyy")}{" "}
          </li>
        ))}
      </div>
  
    );
};

export default Bookings;