import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');

    return JSON.parse(userToken) && JSON.parse(userToken)
  }
  
  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
    
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;