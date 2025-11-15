import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "./logo_clean_verify.png"
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Account from "./components/Account";

import Home from "./components/Home";
import Collection from "./components/Collection";
import Featured from "./components/Featured";
import About from "./components/About";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";



const App = () => {
  

  return (
    
      
      <div id="routes" className=" " >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            
            <Route path={"/collection"} element={<Collection />} />
            <Route path={"/featured"} element={<Featured />} />
            <Route path={"/about"} element={<About />} />
            
            <Route path={"/login"} element={<Login />} />
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/account"} element={<Account />} />

            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/wishlist"} element={<Wishlist />} />
            

          </Routes>
      </div>
       
      
    
  );
};

export default App;
