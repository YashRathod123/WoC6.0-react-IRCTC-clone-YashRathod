import React, { useState, useEffect } from "react";
import "./booklist.css"; 

async function fetchBookList(username) {
  const response = await fetch("https://server-woc.onrender.com/booklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  

  const data = await response.json();
  return data.data;
}
async function handleDelete(tid, username) {
  try {
    const response = await fetch("https://server-woc.onrender.com/delete-book", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tid, username }), // Pass only necessary data
    });

    if (response.ok) {
      // Refresh the booked train list after successful deletion
      fetchBookList(username);
     
    } else {
      console.error("Error deleting booked train");
    }
  } catch (error) {
    console.error("Error deleting booked train:", error);
  }
}

function Booklist() {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        const data = await fetchBookList(username);
        setBookList(data);
       
      } catch (error) {
        
        console.error("Error fetching book list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    
  }, [refreshToggle]);
  const handleRefresh = () => {
  
    setRefreshToggle((prevToggle) => !prevToggle);
    console.log("page refresh");
  }
  return (
    <div>
    

    <div className="booklist-container">
      <h1 className="booklist-heading">Your Booked Trains</h1>
      <div className="booklist-content">
        {!bookList && <div> <h2>No booked trains found</h2>
        <br/> <br/></div>}
        {bookList && bookList.length > 0 && (
          <ul className="booklist">
            {bookList.map((book, index) => (
              <li key={index} className="booklist-item">
                <ul className="book-details">
                  <li>Username: {book.username}</li>
                  <li>Date: {book.date}</li>
                  <li>Train Number: {book.trainnumber}</li>
                  <li>Source: {book.source}</li>
                  <li>Destination: {book.destination}</li>
                  <li>Departure Time: {book.departuretime}</li>
                  <li>Arrival Time: {book.arrivaltime}</li>
                  <li>
                    <button
                      onClick={() => handleDelete(book.tid, book.username)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => handleRefresh()} className="refresh-button">
        Refresh
      </button>
    </div>
    </div>
  );
}

export default Booklist;
