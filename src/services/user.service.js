import axios from "axios";
import AuthService from "./auth.service";

//esto se debe cambiar antes de actualizar el build y subir a produccion.
//const API_URL = "https://cmx.unilimpio.com/index.php/api/";
const API_URL = "http://localhost:3000/api/";

const user = AuthService.getCurrentUser();



const getPuntos = (evalId) => {
  return axios
  .get(API_URL + "getPuntos/" + evalId, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getEvalState = (evalId) => {
  return axios
  .get(API_URL + "getEvalState/" + evalId, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getService = (serviceId) => {
  return axios
  .get(API_URL + "getService/" + serviceId, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getEvals = (uId) => {
  
  return axios
  .get(API_URL + "getEvals/" + uId, { headers: {"Authorization" : `Bearer ${user.token}`} } )
  .catch(function (error){
    //if(error.status === 401){
      localStorage.removeItem("user");
      //console.log()
      

    //}
  });
  
};

const getServices = (uId) => {
  
  return axios
  .get(API_URL + "getServices/" + uId, { headers: {"Authorization" : `Bearer ${user.token}`} } )
  .catch(function (error){
    //if(error.status === 401){
      localStorage.removeItem("user");
      //console.log()
      

    //}
  });
  
};

const setPunto = (evalId, instance, data) => {
  
  

  return axios
    .post(API_URL + "setPunto/" + evalId + '/' + instance, data,
      { headers: {
        "Authorization" : `Bearer ${user.token}`
      } }
      

    )
    .then((response) => {
      /*
      if (response.data.flag) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      */

      return response;
    })
    .catch( (error) => {
      

      return error;
    
    })
};

const setUx = (serviceId, data) => {
  
  

  return axios
    .post(API_URL + "setUx/" + serviceId , data,
      { headers: {
        "Authorization" : `Bearer ${user.token}`
      } }
      

    )
    .then((response) => {
      /*
      if (response.data.flag) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      */

      return response;
    })
    .catch( (error) => {
      

      return error;
    
    })
};
/*
const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};
*/
const UserService = {
  getPuntos,
  getEvals,
  getEvalState,
  setPunto,
  setUx,
  getServices,
  getService,
  //getUserBoard,
  //getModeratorBoard,
  //getAdminBoard,
}

export default UserService;
