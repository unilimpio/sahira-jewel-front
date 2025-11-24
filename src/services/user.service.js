import axios from "axios";
import AuthService from "./auth.service";
import qs from "qs";

//esto se debe cambiar antes de actualizar el build y subir a produccion.
//const API_URL = "https://back.sahirajewels.com/index.php/api/";
const API_URL = "http://sj/index.php/api/";




const getCart = () => {

  const cartItems = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-cartItem-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-cartItem-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Zip Tote Basket',
    href: '#',
    color: 'White and black',
    price: '$140.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-cartItem-03.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
]
  
  let cart = false;
  
  if(localStorage.getItem("sj_cart") !== null){
    cart = JSON.parse(localStorage.getItem("sj_cart"));
  } else {
    localStorage.setItem('sj_cart',JSON.stringify(cartItems) ) ;//set cart as an empty object but at least it exists
  }   
  return cart;    //returns an empty object??
  
  
    
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
