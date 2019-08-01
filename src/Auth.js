import decode from 'jwt-decode';
import React from 'react';
import axios from 'axios';

export default class Authentification extends React.Component {
    login = async (username, password) => {
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
        
        return await axios.post('http://localhost:3285/login', dataJ, config)
        .then(this._checkStatus)
        .then(res=>{
          this.setToken(res.token);
          return Promise.resolve(res)
        });
    }
    loggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired = token => {
        try {
          const decoded = decode(token);
          return decoded.exp < Date.now() / 1000;
        } catch (err) {
          return false;
        }
    };
    
    setToken = idToken => {
      localStorage.setItem("id_token", idToken);
    };
    
    getToken = () => {
      return localStorage.getItem("id_token");
    };
    logout = () => {
      localStorage.removeItem("id_token");
    };
    
    getConfirm = () => {
      let answer = decode(this.getToken());
      return answer;
    };
    _checkStatus = response => {
      if (response.data.success === "true") {
        return response;
      } else {
        let error = new Error(response.data.error);
        error.response = response;
        throw error;
      }
    };
}