import React from "react";
import Register from "./register";
import Home from "./home";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


function App(){

   
    return  (<Router>
        <Routes> 
            <Route path="/home.jsx" element={<Home/>}/>
            <Route path="/" element={<Register/>}/>
         </Routes>
  
    
    </Router>);
    
}

export default App;