import axios from "axios";
//esto se debe cambiar antes de actualizar el build y subir a produccion.
const API_URL = "https://back.sahirajewels.com/index.php/api/";
//const API_URL = "http://sj/index.php/api/";


const register = ( email, password) => {
  return axios.post(API_URL + "register", {
   
    email,
    password,
  });
};

const login = (email, password) => {

  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const guestLogin = (email, password) => {

  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {

  const user = getCurrentUser();
  
  if(typeof user !== "undefined"){ 
    return axios
      .get(API_URL + "logout", { headers: {"Authorization" : `Bearer ${user?.token}`} })
      
      .then((response) => {

        console.log(response)
                   
          
        return response;
        
      })
      .catch((error) => {
        
        if(error.status === 401){

          localStorage.removeItem("user");
        }
      })
  
  } 
    
    
  
  
  
};

const getCurrentUser = () => {

  const user = localStorage.getItem("user");
  
  if(!user){
    return null;
  } else {

    if (user.exp < Date.now()){
      //removeCurrentUser();
      localStorage.removeItem("user");
      return null;
    }

    return JSON.parse(user);    
  }
  
    
};



const removeCurrentUser = () => {

  
  if(!localStorage.getItem("user")){
    return null;
  } else {
    return localStorage.removeItem("user");    
  }
  
    
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  removeCurrentUser
}

export default AuthService;
