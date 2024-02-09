import React, { useState } from "react";
import image from "./IRCTC-Color.png";
import "./signup.css";
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

import Home from "./home";

function SignUp() {
  const [isRegistered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handlechange() {
    if (username && password && email) {
      try {
        await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ username, email, password }),
        });
        setRegistered(true);
      } catch (error) {
        console.error("Error posting data", error);
        alert("Error signing up");
      }
    } else {
      alert("Please enter all required information");
    }
  }

  try {
    if (isRegistered) {
      // navigate("/home.jsx");
      return <Home log={username} />;
    }
  } catch (error) {
    console.error("Error navigating", error);
  }

  return (
    // <div className="container">
    //     <label>Email: </label>
    //     <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
    //     <br />
    //     <label>Username: </label>
    //     <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
    //     <br />
    //     <label>Password: </label>
    //     <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
    //     <br />
    //     <button onClick={handlechange}>Sign up</button>
    //     <br />
    //     <br />
    // </div>
    //     <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
    //   <div className='mask gradient-custom-3'></div>
    //   <MDBCard className='m-5' style={{maxWidth: '600px'}}>
    //     <MDBCardBody className='px-5'>
    //       <h2 className="text-uppercase text-center mb-5">Create an account</h2>
    //       <MDBInput wrapperClass='mb-4' label='UserName' size='lg' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
    //       <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
    //       <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    //       <div className='d-flex flex-row justify-content-center mb-4'>
    //         <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
    //       </div>
    //       <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handlechange} >Sign up</MDBBtn>
    //     </MDBCardBody>
    //   </MDBCard>
    // </MDBContainer>
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
        <img src={image} className="img-fluid" alt="Description of the image" />
         
        </MDBCol>

        <MDBCol col="4" md="6">
          <h1>SignUp Page</h1>
          <MDBInput
            wrapperClass="mb-4"
            label="Your Email"
            size="lg"
            id="form2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="formControlLg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            size="lg"
          />

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={handlechange}>
              Sign-Up
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
      <br></br>

      <br></br>

      <br></br>

      <br></br>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
        ⚠️Please Do Not Share your details with anyone
        </div>
      </div>
    </MDBContainer>
  );
}

export default SignUp;
