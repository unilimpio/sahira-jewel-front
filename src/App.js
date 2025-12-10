import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import 'bootstrap/dist/js/bootstrap.bundle.min'

import "./App.css";
 import "slick-carousel/slick/slick.css";
    import "slick-carousel/slick/slick-theme.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Account from "./components/Account";

import Home from "./components/Home";
import Collection from "./components/Collection";
import Product from "./components/Product";
import Featured from "./components/Featured";
import Contact from "./components/Contact";

import Wishlist from "./components/Wishlist";
import About from "./components/About";
import MyOrders from "./components/MyOrders";
import FinishOrder from "./components/FinishOrder";

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}


const App = () => {

   

  return (
    
      
      <div id="routes" className=" " >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            
            <Route path={"/collection"} element={<Collection />} />
            <Route path={"/product"} element={<Product />} />
            <Route path={"/featured"} element={<Featured />} />
            <Route path={"/wishlist"} element={<Wishlist />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/contact"} element={<Contact />} />
            
            <Route path={"/login"} element={<Login />} />
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/account"} element={<Account />} />

            <Route path={"/account/orders"} element={<MyOrders />} />
            <Route path={"/finish-order"} element={<FinishOrder />} />
            

          </Routes>
      </div>
       
      
    
  );
};

export default App;
