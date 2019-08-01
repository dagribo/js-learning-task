import decode from 'jwt-decode';
import React from 'react';
import axios from 'axios';

export default class Authentification extends React.Component {
    constructor(props){
        super(props);
    }
    login(username, password){
        const dataJ = JSON.stringify({
          username,
          password
        })
        const config = {
          headers: {
              'Content-Type': 'application/json',
          }
        }

        if (this.loggedIn()) {
          config["Authorization"] = "Bearer " + this.getToken();
        }
        
        return axios.post('http://localhost:3285/login', dataJ, config)
        .then(this._checkStatus)
        //.then(response => response.json())
        .then(res=>{
          this.setToken(res.token);
          return Promise.resolve(res)
        });
        /*return this.fetch(`http://localhost:3285/login`,{
            method: 'POST', dataJ
            //data: JSON.stringify({
            //    username,
            //    password
            //})
        }).then(res=>{
            this.setToken(res.token);
            return Promise.resolve(res);
        })*/
    }
    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }
    isTokenExpired = token => {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired.
            return true;
          } else return false;
        } catch (err) {
          console.log("expired check failed! Line 42: AuthService.js");
          return false;
        }
    };
    
    setToken = idToken => {
        // Saves user token to localStorage
      localStorage.setItem("id_token", idToken);
    };
    
    getToken = () => {
        // Retrieves the user token from localStorage
      return localStorage.getItem("id_token");
    };
    logout = () => {
        // Clear user token and profile data from localStorage
      localStorage.removeItem("id_token");
    };
    
    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
      let answer = decode(this.getToken());
      console.log("Recieved answer!");
      return answer;
    };
    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
      //if (this.loggedIn()) {
      //  headers["Authorization"] = "Bearer " + this.getToken();
      //}
    
      return fetch(url, {
        headers,
        ...options
      })
        //.then(this._checkStatus)
        //.then(response => response.json());
    };
    _checkStatus = response => {
      console.log(response);
        // raises an error in case response status is not a success
      //if (response.status >= 200 && response.status < 300) {
      if (response.data.success=="true") {
          // Success status lies between 200 to 300
        return response;
      } else {
        var error = new Error(response.data.error);
        error.response = response;
        throw error;
      }
    };
}