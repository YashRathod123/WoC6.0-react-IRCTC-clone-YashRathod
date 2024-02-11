import React, { useState } from "react";

import "./signup.css";
import { useNavigate } from "react-router-dom";


// import "bootstrap/dist/css/bootstrap.css";
import { Button, Card } from "react-bootstrap";

function SignUp() {
  const [isRegistered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
    
  async function handlechange() {
        setloading(true);

    if (username && password && email) {
      try {
        localStorage.removeItem("token");
        await fetch("https://server-woc.onrender.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ username, email, password }),
          
        });
        setRegistered(true);
                setloading(false);

      } catch (error) {
                setloading(false);

        console.error("Error posting data", error);
        alert("Error signing up");
      }
    } else {
              setloading(false);

      alert("Please enter all required information");
    }
  }

  try {
    if (isRegistered) {
      navigate("/home");
    }
  } catch (error) {
    console.error("Error navigating", error);
  }

  function handleKeyPress(event){
    if(event.key==="Enter"){
      event.preventDefault();
      handlechange();
    }
  }

  return (
    <>
      <Card className="container signup">
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <br />
        <Button onClick={handlechange}>Sign{loading && "ing"} up{loading && ".."}</Button>

        <br />
        <br />
      </Card>
    </>
  );
}

export default SignUp;
