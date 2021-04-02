import React from 'react';
import { useHistory } from 'react-router';
import Book from '../Book/Book';

const Car = ({product}) => {

    const history= useHistory()
    const handleBuy=(carId)=>{
        history.push(`/book/${carId}`);
        fetch(`https://car-dealar.herokuapp.com/bookin/${carId}`,{
        // method:'GET',
        // headers:{'Content-Type':'application/json'},
        // body:JSON.stringify()            
        })
        .then(res=>res.json())
        .then(data=>console.log('data get ',data[0].name))
   
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
            <button onClick={()=>handleBuy(product._id)}>Buy Now</button>
            </div>
          </div>
        </div>
      );
};

export default Car;