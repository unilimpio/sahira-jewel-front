import axios from "axios";
import AuthService from "./auth.service";

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

const getEvals = (uId) => {
  return axios
  .get(API_URL + "getEvals/" + uId, { headers: {"Authorization" : `Bearer ${user.token}`} } )
  .catch(function (error){
    if(error.status){
      localStorage.removeItem("user");
    }
  });
  
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
  //getUserBoard,
  //getModeratorBoard,
  //getAdminBoard,
}

export default UserService;
