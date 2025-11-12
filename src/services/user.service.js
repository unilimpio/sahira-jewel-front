import axios from "axios";
import AuthService from "./auth.service";
import qs from "qs";

//esto se debe cambiar antes de actualizar el build y subir a produccion.
//const API_URL = "https://cmx.unilimpio.com/index.php/api/";
const API_URL = "http://cmxbk/index.php/api/";

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

const getTask = (taskId) => {
  return axios
  .get(API_URL + "getTask/" + taskId, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getServicePub = (serviceId) => {
  return axios
  .get(API_URL + "getServicePublic/" + serviceId, 
    { headers: {}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getService = (servId) => {
  return axios
  .get(API_URL + "getService/" + servId, 
    { headers: {"Authorization" : `Bearer ${user.token}`}})
  .catch(function (error) {
    if(error.status === 401){
      localStorage.removeItem("user");
    }

  })
};

const getIp = () => {
  return axios
  .get('https://geolocation-db.com/json/e6256a50-6cef-11ef-9699-010d5e77689d', 
    { headers: {}})
  .catch(function (error) {
    console.log("unable to connect to User info API:"+error);

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

const getTasks = (uId) => {
  
  return axios
  .get(API_URL + "getTasks/" + uId, { headers: {"Authorization" : `Bearer ${user.token}`} } )
  .catch(function (error){
    //if(error.status === 401){
      localStorage.removeItem("user");
      //console.log()
      

    //}
  });
  
};

const getServices = (ubId) => {
  
  return axios
  .get(API_URL + "getServices/" + ubId, { headers: {"Authorization" : `Bearer ${user.token}`} } )
  .catch(function (error){
    //if(error.status === 401){
      localStorage.removeItem("user");
      //console.log()
      

    //}
  });
  
};

const getUbs = (uId) => {
  
  return axios
  .get(API_URL + "getUbs/" + uId, { headers: {"Authorization" : `Bearer ${user.token}`} } )
  .catch(function (error){
    if(error.status === '401'){
      localStorage.removeItem("user");
      //console.log()
    }
  });
  
};

const setPunto = (evalId, instance, data) => {
  
  

  return axios
    .post(API_URL + "setPunto/" + user.uId + "/" + evalId + '/' + instance, data,
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
    .post(API_URL + "setUx/" + serviceId , qs.stringify(data),
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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

const setTask = (serviceId, uxId, data) => {
  
  

  return axios
    .post(API_URL + "setTask/" + user.uId + "/"+serviceId + "/" + uxId, data,
      { headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
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

const updateTask = (taskId, data) => {
  
  

  return axios
    .post(API_URL + "updateTask/" + user.uId + "/"+taskId, data,
      { headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
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

const setUxPub = (serviceId, data) => {
  
  

  return axios
    .post(API_URL + "setUxPublic/" + serviceId , data,
      { headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
        
        
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

const setUxComm = (uxId, data) => {
  
  

  return axios
    .post(API_URL + "setUxComm/" + uxId , data,
      { headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
        
        
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

const setBadUx = (serviceId, uxId, data) => {
  
  

  return axios
    .post(API_URL + "setBadUx/" + serviceId + "/" + uxId, qs.stringify(data),
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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

const getWeatherInfo = (location) => {
  
  return axios
  .get('https://api.weatherapi.com/v1/forecast.json?q=' + location + '&days=3&lang=es&key=65a40346f3f74a788b8181738252509', 
    { headers: {}})
  .catch(function (error) {
    

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
  getTasks,
  getEvalState,
  getTask,
  setPunto,
  setUx,
  setTask,
  updateTask,
  setUxPub,
  setUxComm,
  setBadUx,
  getUbs,
  getServices,
  getService,
  getServicePub,
  getIp,
  getWeatherInfo,
  //getUserBoard,
  //getModeratorBoard,
  //getAdminBoard,
}

export default UserService;
