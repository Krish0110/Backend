//main api for the backend
const express=require('express');
const path=require('path');
const mysql = require("mysql2")
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config();

//initializing express
const app=express();

// Environment variables
const DB_HOST = process.env.DB_HOST 
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = process.env.DB_PASSWORD 
const DB_NAME = process.env.DB_NAME 
const DB_PORT = process.env.DB_PORT 
const RETRY_INTERVAL = 5000; // Retry every 5 seconds

// Function to connect to MySQL with retries
let dbConnection;

//connecting to database
function connectToDatabase(attempt = 1) {
  console.log(`Attempting to connect to MySQL... (Attempt ${attempt})`);
  
  dbConnection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  });

  dbConnection.connect((err) => {
    if (err) {
      console.error(`Database connection failed: ${err.message}`);
      console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
      setTimeout(() => connectToDatabase(attempt + 1), RETRY_INTERVAL);
    } else {
      console.log("Connected to MySQL database.");
    }
  });

  // Handle disconnection
  dbConnection.on("error", (err) => {
    console.error("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Reconnecting to database...");
      connectToDatabase();
    }
  });
}

// Start the first connection attempt
connectToDatabase();

//using the bodyparser and cors
app.use(bodyParser.json());
app.use(cors());

//creating the route to verify page
app.use('/api/verify-code/',require('./routes/api/verifyCode'))
app.use('/api/get-users/',require('./routes/api/getUsers')(dbConnection))

//port to run the server
app.get('/',(req,res)=>{
  res.send('Hi from backend')
})

const PORT=process.env.PORT||5000

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));