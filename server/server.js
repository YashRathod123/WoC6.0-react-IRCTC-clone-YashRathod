const express = require("express");

const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'your-sendgrid-username',
    pass: 'your-sendgrid-password',
  },
});


app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = md5(password);
    console.log("($1, $2, $3)", [username, email, hashedPassword]);
    await pool.query(
      "INSERT INTO user_data (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);

  try {
    const result = await pool.query(
      "SELECT * FROM user_data WHERE username = $1",
      [username]
    );

    console.log(result.rows);
    if (result.rows[0].password === hashedPassword) {
      const token = jwt.sign({ username }, "YASH MC!!", { expiresIn: "10" });

      res
        .status(200)
        .json({ success: true, message: "Login successful", token, username });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/search", async (req, res) => {
  var { source, destination, date } = req.body;
  var tdate;
  if (date != null) tdate = date.substring(0, 10);

  try {
    console.log(tdate);
    const result = await pool.query(
      "SELECT * FROM trains WHERE source = $1 AND destination = $2 AND date = $3",
      [source, destination, tdate]
    );

    if (result.rows.length > 0) {
      const to = result.rows;
      console.log(result.rows);
      res.json({ data: to });
    } else {
      res.json({}); // or handle the case when no results are found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/test", async (req, res) => {
  const result = await pool.query(
    "select * from trains join book on trains.tid=book.tid"
  );

  res.json(result.rows);
});

app.post("/book", async (req, res) => {
  const { tid, log ,email} = req.body;
  try {
    console.log(log);
    console.log(email);
    await pool.query("INSERT INTO book (tid,username) VALUES ($1, $2)", [tid, log]);
    res.status(200).json({ success: true });
    // const emailOptions = {
    //   from: '202201524@daiict.ac.in',
    //   to: {email}, // Use the user's email obtained during signup
    //   subject: 'Train Booking Confirmation',
    //   text: 'Thank you for booking a train with us. Your booking details are...',
    //   // You can also use HTML content in the `html` property for a more styled email
    // };

    // transporter.sendMail(emailOptions, (error, info) => {
    //   if (error) {
    //     console.error('Error sending email:', error);
    //   } else {
    //     console.log('Email sent:', info.response);
    //   }
    // });

    // Send a response indicating successful booking
    res.status(200).json({ success: true, message: 'Train booked successfully' });
  } catch (err) {
    console.error(err);
  }
});

app.post("/booklist", async (req, res) => {
  const { username } = req.body;
   console.log(username);
  try {
    const result = await pool.query(
      `SELECT * FROM book AS b JOIN trains AS t ON b.tid=t.tid WHERE b.username='${username}'`
    );
    if (result.rows.length > 0) {
      const to = result.rows;
      console.log(result.rows);
      res.json({ data: to });
    } else {
      res.json({});
    }
  } catch (err) {
    console.log("Error");
    
    // console.error(err);
  }
});

app.delete("/delete-book", async (req, res) => {
  const { tid } = req.body;

  try {
    await pool.query("DELETE FROM book WHERE tid = $1", [tid]);
    res.status(200).json({ success: true, message: "Booked train deleted successfully" });
  } catch (error) {
    console.error("Error deleting booked train:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
