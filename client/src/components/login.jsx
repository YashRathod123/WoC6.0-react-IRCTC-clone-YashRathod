import React, { useState } from 'react';
import SignUp from './signup';
import Home from './home';
import "./login.css";
import image from "./IRCTC-Color.png";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [whoLogin, setWhoLog] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch("https://woc-yash-server.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Authentication successful:", data.message);
         setWhoLog(username);
        setIsLoggedIn(true);
      } else {
        console.error("Authentication failed:", data.message);
        alert("Check your password or username or signup");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  if (isLoggedIn) {
     return <Home log={whoLogin}/>;
  }

  function handleSignup(e) {

    // e.preventdefault();
    setRedirectToSignUp(true);
    
  }

  if (redirectToSignUp) {
    return <SignUp />;
  }

  return (
  //   <div className="container">
  //     <form>
  //       <div>
  //         <label>Username:</label>
  //         <input
  //           type="text"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //       </div>
  //       <div>
  //         <label>Password:</label>
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>
  //       <button type="button" onClick={handleLogin}>
  //         Login
  //       </button>
  //       <div>
  //         Don't have an account?
  //         <button type="button" onClick={handleSignup}>
  //           Sign Up
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
  <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
        <img src={image} className="img-fluid" alt="Description of the image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
           

          <div className="divider d-flex align-items-center my-4">
           
          </div>

          <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' value={username} onChange={(e) => setUsername(e.target.value)} size="lg" />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' onChange={(e) => setPassword(e.target.value)} value={password}  size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#" className="link-danger" onClick={handleSignup}>signup</a></p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>

   

        
      </div>

    </MDBContainer>
  );

};

export default  Login ; // Exporting Login component and whoLoggedin state
