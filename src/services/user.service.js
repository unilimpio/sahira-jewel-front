import axios from "axios";
import AuthService from "./auth.service";


//esto se debe cambiar antes de actualizar el build y subir a produccion.
//const API_URL = "https://back.sahirajewels.com/index.php/api/";
//const API_URL = "http://sj/index.php/api/";
const API_URL = process.env.REACT_APP_API_URL;

// ==========================================
// INTERCEPTOR GLOBAL PARA CAPTURAR EL 401
// ==========================================
axios.interceptors.response.use(
  (response) => response, // Si todo sale bien, deja pasar la respuesta
  (error) => {
    // Axios guarda el error del servidor dentro de error.response
    if (error.response && error.response.status === 401) {
      console.warn("Token expirado (401). Limpiando sesión...");
      
      // Usamos el método que ya tienes en tu AuthService
      AuthService.removeCurrentUser(); 
      
      // Opcional: limpiar también la sesión si usas otra llave en localStorage
      localStorage.removeItem('sj_user'); 
      
      // Recargamos la página. Esto destruye el estado de React,
      // obligando a tu Nav a renderizar "Sign In" y redirigiendo al usuario.
      window.location.reload(); 
    }
    return Promise.reject(error);
  }
);
// ==========================================


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

const getCards = (catId = false) => {
  
  return axios
  .get(API_URL + "getCards/false"  , 
    { headers: {}})
  .catch(function (error){
    console.log(error)
  });
  
};

const getContent = (catId) => {
  if(!catId ){
          return axios
        .get(API_URL + "getContent"  , 
          { headers: {}})
        .catch(function (error){
          console.log(error)
        });
  } else {

        return axios
      .get(API_URL + "getContent/" + catId  , 
        { headers: {}})
      .catch(function (error){
        console.log(error)
      });
  }
  
  
};

const getProduct = (prodId) => {
  
  return axios
  .get(API_URL + "getProduct/" + prodId , 
    { headers: {}})
  .catch(function (error){
    console.log(error)
  });
  
};

const getWishlist = (user) => {
  
  return axios
  .get(API_URL + "getWishlist/" + user.uId , 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch((error)=>{
    console.log(error)
    
    if(error?.status === 401){      
      console.log('finally i detected a 401 error response, i shall remove traces of the old session so the user is redirected to login page somehow ', error)
      AuthService.removeCurrentUser();
      window.location.reload()            
    }
    
  });
  
};

const getOrders = (user) => {
  
  return axios
  .get(API_URL + "getOrders/" + user.uId , 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error){
    console.log(error)
    if(error.includes('401')){
      localStorage.removeItem('sj_user_session');
      window.location.reload();
    }
  });
  
};

const getCheckout = () => {
  
  return axios
  .get(API_URL + "getCheckout"  , 
    { headers: {}})
  .catch(function (error){
    console.log(error)
    
  });
  
};

const orderConfirm = (orderPayload) => {  
  
  return axios
  .post(API_URL + "orderConfirm"  , orderPayload,
    { headers: {
          'Content-Type': 'application/json'
        }})
  .catch(function (error){
    console.log(error)
    
  });
  
};

const payLinkRequest = (payload) => {  
  
  return axios
  .post(API_URL + "setLinkPago"  , payload,
    { headers: {
          'Content-Type': 'application/json',
        }})
  .catch(function (error){
    console.log(error)
    
  });
  
};

const paymentConfirm = (payload) => {  
  
  return axios
  .post(API_URL + "orderConfirm"  , payload,
    { headers: {
          'Content-Type': 'application/json'
        }})
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

const setWish = (user,prodId) => {
  
  return axios
  .post(API_URL + "setWish/" + user.uId +'/'+prodId, {},
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error){
    console.log(error)
    if(error.status === 401 ){

      AuthService.removeCurrentUser()
      return null;
                            
    }
    

  });
  
};

const removeWish = (user,wishId) => {
  
  return axios
  .get(API_URL + "removeWish/" +user.uId+'/'+wishId, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error){
    console.log(error)
    if(error.status === 401 ){

      AuthService.removeCurrentUser()
                            
    }

  });
  
};

const getProductFromWish = (user,wishId) => {
  
  return axios
  .get(API_URL + "getProductFromWish/" + user.uId+'/'+wishId , 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error){
    console.log(error)
  });
  
};



const UserService = {
  
  getCart,
  getContent,
  
  getWishlist,
  getCategories,
  getProducts,
  getCards,
  getProduct,
  getOrders,
  getCheckout,
  getOrderItems,
  setWish,
  removeWish,
  getProductFromWish,
  orderConfirm,
  payLinkRequest,
  paymentConfirm,
}

export default UserService;
