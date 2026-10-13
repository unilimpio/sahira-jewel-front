import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";

import 'bootstrap/dist/js/bootstrap.bundle.min'

import "./App.css";
 import "slick-carousel/slick/slick.css";
    import "slick-carousel/slick/slick-theme.css";

import AuthService from "./services/auth.service";

import ProtectedRoute from './components/ProtectedRoute';

import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Account from "./components/Account";

import Home from "./components/Home";
import Collection from "./components/Collection";
import Product from "./components/Product";

import Contact from "./components/Contact";

import Wishlist from "./components/Wishlist";
import About from "./components/About";
import MyOrders from "./components/MyOrders";
import Checkout from "./components/Checkout";
import Thankyou from "./components/Thankyou";

import Privacy from "./components/Privacy";
import Gift from "./components/Gift"

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

const [cart, setCart] = usePersistedState('sjCart', []);
//const [isCartOpen, setIsCartOpen] = useState(false); // ✨ Mueve el estado 'open' aquí   

  return (
    
      
      <div id="routes" className=" " >
          <Routes>
            <Route path={"/"} element={<Home cart={cart} setCart={setCart} />} />
            <Route path={"/home"} element={<Home cart={cart} setCart={setCart}  />} />
            
            <Route path={"/collection"} element={<Collection cart={cart} setCart={setCart}  />} />
            <Route path={"/product"} element={<Product cart={cart} setCart={setCart}  />} />
            <Route path={"/gift"} element={<Gift cart={cart} setCart={setCart}  />} />
            
            <Route path={"/about"} element={<About cart={cart} setCart={setCart}  />} />
            <Route path={"/contact"} element={<Contact cart={cart} setCart={setCart}  />} />
            
            <Route path={"/login"} element={<Login />} />
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/register"} element={<Register />} />
            
            <Route path={"/checkout"} element={<Checkout cart={cart} setCart={setCart}  />} />
             <Route path={"/thankyou/:newOrderId"} element={<Thankyou />} />

            <Route path={"/privacy"} element={<Privacy />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path={"/account"} element={<Account cart={cart} setCart={setCart}  />} />
              <Route path={"/wishlist"} element={<Wishlist cart={cart} setCart={setCart} />} />
              <Route path={"/account/orders"} element={<MyOrders cart={cart} setCart={setCart}  />} />

              {/* 
              <Route path="/orders" element={<Orders />} />
              Más páginas que requieran token aquí */}
            </Route>

          </Routes>
      </div>
       
      
    
  );
};

export default App;
