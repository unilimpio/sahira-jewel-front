import axios from "axios";
import AuthService from "./auth.service";
import qs from "qs";

//esto se debe cambiar antes de actualizar el build y subir a produccion.
//const API_URL = "https://back.sahirajewels.com/index.php/api/";
const API_URL = "http://sj/index.php/api/";




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

const getCategories = (catId) => {
  
  return axios
  .get(API_URL + "getCategories/" + catId , 
    { headers: {}})
  .catch(function (error){
   console.log(error)
  });
  
};

const getProducts = (catId) => {
  
  return axios
  .get(API_URL + "getProducts/" + catId , 
    { headers: {}})
  .catch(function (error){
    console.log(error)
  });
  
};

const getProduct = (prodId) => {
  
  return axios
  .get(API_URL + "getProduct/" + prodId , 
    { headers: {}})
  .catch(function (error){
    console.log(error)
  });
  
};

const getOrders = (user) => {
  
  return axios
  .get(API_URL + "getOrders/" + user.id , 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error){
    console.log(error)
  });
  
};

const getOrderItems = (user,orderId) => {
  
  return axios
  .get(API_URL + "getOrders/" + orderId , 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error){
    console.log(error)
  });
  
};



const UserService = {
  
  getCart,
  getCategories,
  getProducts,
  getProduct,
  getOrders,
  getOrderItems,
  
  
}

export default UserService;
