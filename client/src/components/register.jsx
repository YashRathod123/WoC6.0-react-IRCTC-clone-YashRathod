import React, { useState } from "react";
import Login from "./login";
import SignUp from "./signup";
import Home from "./home";


function Register(){

  
    const [islogin,setIslogin]=useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);

    function handleLogin(){
        setLoggedIn(true);
      };
      function toggleAuthType(){
        setIslogin((prevIsLogin) => !prevIsLogin);
      };


    return (<div>
        {isLoggedIn ? (
        <Home />
      ) : islogin ? (
        <Login toggleAuthType={toggleAuthType} handleLogin={handleLogin} />
      ) : (
        <SignUp toggleAuthType={toggleAuthType} />
      )}
    </div>);
};

export default Register;