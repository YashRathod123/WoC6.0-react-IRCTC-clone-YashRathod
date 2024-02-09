import React, { useState } from "react";
import "./home.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PayDetails from "./payDetails";

function Home({log}) {
  const [date, setDate] = useState(new Date());
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [trainid, settrainid] = useState();
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
        const clonedResponse = response.clone(); // Clone the response
        const results = await clonedResponse.json();
        console.log(results.data);
        setSearchResults(results.data || []);
      } else {
        console.log("Error in fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <div className="container">
        <ul className="nav nav-pills">
          
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Booklist
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About Us
            </a>
          </li>
        </ul>
      </div>
      <div className="welcome">
        <h1>Welcome,</h1>
        <p>
          Revolutionize your travel experience with our train travel
          website,offering seamless booking,real-time updates,and current
          itineraries.Explore the world by rail,where every journey is a
          story,waiting to be written.{" "}
        </p><div
   Style = {{
      backgroundImage:
      './irctc.jgp',
   }}
   >

</div>

       
      </div>
      <div>
        <h1>Start Your Journey</h1>
        <label>From:</label>
        <br />
        <input
          type="text"
          placeholder="Your Location"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        ></input>
        <br />
        <br />
        <br />
        <label>To :</label>
        <br />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        ></input>
        <br />
      </div>
      <div>
        <h2 style={{marginTop:0 + 'px'}}>Date</h2>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy h:mm aa"
          
        />
      </div>
      <br />
      <div>
        <label>All Classes</label>
        <br />
        <select>
          <option value="All classes">All Classes</option>
          <option value="second siting">Second Sitting(2S)</option>
          <option value="Ac 3 tier">AC 3 Tier(3A)</option>\
          <option value="ac chair car">AC Chair Car(CC)</option>
          <option value="exec. chair car">Exec. Chair Car(Ec)</option>
        </select>
      </div>
      <br />
      <div>
        <label>Categories</label>
        <br />
        <select>
          <option value="general">GENERAL</option>
          <option value="ladies">LADIES</option>
          <option value="lower berth/sr.citizen">
            LOWER BERTH/SR. CITIZEN
          </option>
          <option value="person with disability">PERSON WITH DISABILITY</option>
          <option value="duty pass">DUTY PASS</option>
          <option value="tatkal">TATKAL</option>
        </select>
      </div>
      <br />
      <button onClick={handleSearch}>SEARCH</button>
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <div>
                <li key={result.trainnumber}>
                  Train Number: {result.trainnumber}, Source: {result.source},
                  Destination: {result.destination}
                </li>
                <button onClick={() => handleShowPaymentDetails(result.tid)}>
                  Book
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
      {showPaymentDetails && <PayDetails tid={trainid} log={log} />}
      <br />
      <br />
      <div>
        <p>Our Expertise</p>
        <div>
          <h2>User-friendly Interface</h2>
          <p>
            Our app boasts an incredibly intuitive and user-friendly interface,
            ensuring that the process of searching,selecting and booking train
            tickets is a breeze. With a clean and organized designs,users can
            navigate effortlessly,making their booking experience enjoyable and
            efficient.
          </p>
        </div>
        <div>
          <h2>Extensive Train Options</h2>
          <p>
            Gain access to an extensive database of train schedules and
            routes,providing users with a comprehensive list of options.Our
            app's advanced filtering and sorting features empower users to
            quickly find the most suitable trains based on their
            preference,ensuring a tailored and convenient experience.
          </p>
        </div>
        <div>
          <h2>Real Time Availability</h2>
          <p>
            Stay informed by real-time updates on seat availability and ticket
            status. Recieve instant confirmation for booked tickets, eliminating
            any uncertainty and allowing users to plan their journey with
            confidence.
          </p>
        </div>
        <div>
          <h2>Personalized User Account</h2>
          <p>
            Enjoy the benefits of a Personalized user account,allowing for quick
            and efficient booking. Save preference,access booking history, and
            tailor the app to individual needs,providing a seamlessm and
            Personalized experience for every user.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
