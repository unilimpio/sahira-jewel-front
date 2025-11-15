import axios from "axios";
import AuthService from "./auth.service";
import qs from "qs";

//esto se debe cambiar antes de actualizar el build y subir a produccion.
const API_URL = "https://back.sahirajewels.com/index.php/api/";
//const API_URL = "http://cmxbk/index.php/api/";




const getCart = () => {

  
  let cart = false;
  if(localStorage.getItem("sj_cart") !== null){
    cart = localStorage.getItem("sj_cart");
  };
  
  if(!cart){
    return null;
  } else {
    return JSON.parse(cart);    //returns an empty object??
  }
  
    
};



const UserService = {
  
  getCart,
  
}

export default UserService;
