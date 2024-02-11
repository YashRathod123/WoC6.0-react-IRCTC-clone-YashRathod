import React, { useState } from "react";
import SignUp from "./signup";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setloading(true);
    try {
      const response = await fetch("https://server-woc.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Authentication successful:", data.message);
        localStorage.removeItem("token");
        
       
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        navigate("/home");
         setloading(false);
      } else {
         setloading(false);
        console.error("Authentication failed:", data.message);
        alert("Check your password or username or signup");
      }
    } catch (error) {
       setloading(false);
      console.error("Error during login:", error);
    }
  }

  
  function handleSignup() {
    setRedirectToSignUp(true);
  }

  if (redirectToSignUp) {
    return <SignUp />;
  }
  function handleKeyPress(event){
    if(event.key==="Enter"){
      event.preventDefault();
      handleLogin();
    }
  }

  return (
    <div className="container">
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login{loading && ".."}
        </button>
        <div>
        <br />
        

          Don't have an account?
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login; // Exporting Login component and whoLoggedin state
