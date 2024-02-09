import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function PayDetails({ log, tid }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("");
  const [showpay, setShowpay] = useState(true);
  const navigate = useNavigate();


  async function handlePaymentSubmit() {
    console.log(log);
    console.log(tid);
    console.log("Payment submitted:", {
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      country,
    });
    try {
      const response = await fetch("http://localhost:8000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tid, log }),
      });
      if (response.ok) {
        console.log("Train booked");
        setShowpay(false);
        
      }
    } catch (err) {
     
      console.log(err);
    }
    

    navigate("/booklist");


  }

 

  return (

    
    <div>
      <h2>Payment Details</h2>
      <form>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
          />
        </div>
        <div>
          <label htmlFor="expirationMonth">Expiration Month:</label>
          <input
            type="text"
            id="expirationMonth"
            value={expirationMonth}
            onChange={(e) => setExpirationMonth(e.target.value)}
            placeholder="MM"
          />
        </div>
        <div>
          <label htmlFor="expirationYear">Expiration Year:</label>
          <input
            type="text"
            id="expirationYear"
            value={expirationYear}
            onChange={(e) => setExpirationYear(e.target.value)}
            placeholder="YYYY"
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="Enter CVV"
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
          />
        </div>
        <button type="button" onClick={handlePaymentSubmit}>
          Submit Payment
        </button>
      </form>
    </div>
  );

 
}
export default PayDetails;
