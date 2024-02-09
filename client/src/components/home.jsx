import React, { useState } from "react";
import "./home.css";
import DatePicker from "react-datepicker";
import PayDetails from "./payDetails";
import "react-datepicker/dist/react-datepicker.css";
import {  useNavigate } from "react-router-dom";

function Home() {
  const name = localStorage.getItem("username");
  const [date, setDate] = useState(new Date());
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [trainid, settrainid] = useState();
  const [notfound, setNotfound] = useState(false);
  const [showExpertise, setShowExpertise] = useState(true); 
  const navigate = useNavigate();

  function handleShowPaymentDetails(tid) {
    setShowPaymentDetails(true);
    settrainid(tid);
  }

  async function handleSearch() {
    try {
      console.log(date);
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source, destination, date }),
      });

      if (response.ok) {
        const clonedResponse = response.clone(); 
        const results = await clonedResponse.json();
        console.log(results.data);
        setSearchResults(results.data || []);

        if (searchResults.length === 0) setNotfound(true);
        setShowExpertise(false); 
        console.log("Error in fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (

   <div className="backgorund" > 
<ul className="nav">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
           About Us
          </a>
        </li>
        <li className="nav-item">
          <a href="/booklist" className="nav-link">
            Booklist
          </a>
        </li>
        <li className="nav-center">
          <a href="#" className="nav-link">
           Hello {name}
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
            }}
            href="/home"
            className="nav-link logout"
          >
            LogOut
          </a>
        </li>
      </ul>

   <div className="home-container" >

   <header className="home-header">
     <> 
       <h1>Welcome to TrainBooking</h1>
       <p>
         Revolutionize your travel experience with our train travel
         website, offering seamless booking, real-time updates, and current
         itineraries. Explore the world by rail, where every journey is a
         story, waiting to be written.
       </p> 
     </>
   </header>

   <section className="search-section">
     <div className="search-form">
       <input
         type="text"
         placeholder="From"
         value={source}
         onChange={(e) => setSource(e.target.value)}
       />
       <input
         type="text"
         placeholder="To"
         value={destination}
         onChange={(e) => setDestination(e.target.value)}
       />
       <DatePicker selected={date} onChange={(date) => setDate(date)} />
       <button onClick={handleSearch}>Search Trains</button>
     </div>
     
     {searchResults.length > 0 && (
       <div className="search-results">
         <h2>Search Results</h2>
         <ul>
           {searchResults.map((result) => (
             <li key={result.tid}>
               <span>Train Number: {result.trainnumber}</span>
               <span>Source: {result.source}</span>
               <span>Destination: {result.destination}</span>
               <br/><br/>
               <button onClick={() => handleShowPaymentDetails(result.tid)}>
                 Book Now
               </button>
               <br/>
               <br/>
             </li>
           ))}
         </ul>
       </div>
     )}

     {searchResults.length === 0 && notfound && (
       <p>No trains found for the selected route and date</p>
     )}
   </section>

   {showPaymentDetails && <PayDetails tid={trainid} log={name} />}

   {showExpertise && ( 
     <div className="Ram">
       <h1>Our Expertise</h1>
       <div>
         <h2>Friendly Interface</h2>
         <p>
           Our app boasts an incredibly intuitive and -friendly interface,
           ensuring that the process of searching, selecting, and booking
           train tickets is a breeze. With a clean and organized designs, s
           can navigate effortlessly, making their booking experience
           enjoyable and efficient.
         </p>
       </div>
       <div>
         <h2>Extensive Train Options</h2>
         <p>
           Gain access to an extensive database of train schedules and
           routes, providing s with a comprehensive list of options. Our
           app's advanced filtering and sorting features empower s to
           quickly find the most suitable trains based on their preference,
           ensuring a tailored and convenient experience.
         </p>
       </div>
       <div>
         <h2>Real Time Availability</h2>
         <p>
           Stay informed by real-time updates on seat availability and
           ticket status. Receive instant confirmation for booked tickets,
           eliminating any uncertainty and allowing s to plan their journey
           with confidence.
         </p>
       </div>
       <div>
         <h2>Personalized Account</h2>
         <p>
           Enjoy the benefits of a Personalized account, allowing for quick
           and efficient booking. Save preference, access booking history,
           and tailor the app to individual needs, providing a seamless and
           Personalized experience for every.
         </p>
       </div>
     </div>
   )}
 </div></div>
  );
}

export default Home;
