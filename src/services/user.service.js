import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:3000/api/";

const user = AuthService.getCurrentUser();


const getPoints = (clientID, campanaID) => {
  return axios
  .get(API_URL + "getPoints/" + clientID + "/" + campanaID, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getIndex = (clientID) => {
  return axios
  .get(API_URL + "getIndex/" + clientID, { headers: {"Authorization" : `Bearer ${user.token}`} } )
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
  getPoints,
  getIndex,
  //getUserBoard,
  //getModeratorBoard,
  //getAdminBoard,
}

export default UserService;
