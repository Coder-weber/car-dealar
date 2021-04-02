import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddCar from "./components/AddCar/AddCar";
import AddProduct from "./components/AddProduct/AddProduct";
import Admin from "./components/Admin/Admin";
import Book from "./components/Book/Book";
import CheckOut from "./components/CheckOut/CheckOut";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext= createContext();

function App() {
  const  [loginInUser,setLoginInUser] =useState({});
  return(
    <UserContext.Provider value={[loginInUser,setLoginInUser]} >
      
    <p>{loginInUser.email}</p>
    <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/book/:id">
            <Book></Book>
          </PrivateRoute>
          <PrivateRoute path="/orders">  
          <Orders></Orders>
          </PrivateRoute>
          <Route path="/checkout">
              <CheckOut></CheckOut>
          </Route>
          
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
