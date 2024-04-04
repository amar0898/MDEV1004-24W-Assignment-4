/*
 * Filename: index.js
 * Amardeep Amardeep - 200567064
 * Yamuna Ravi Thalakatt - 200506480
 * Date: 03 April 2024
 */

require('dotenv').config();
const express = require('express');
const { mongoDB } = require('./database/db.js'); // Importing the mongoose object for MongoDB connection
const bodyParser = require('body-parser');
const routes = require('./router/routes.js'); // Importing book routes
const cors=require('cors');
const app = express();
const http = require("http");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', routes);
// Configure user session
app.use(session({
  secret: 'askhfiefbdfhjerrytjf', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure to true in production with HTTPS
}));

app.listen(port, async ()=>{
    console.log(`server is running on port ${port}`)

// Ensuring the connection is established to mongoDB database before syncing the favourite books model
await mongoDB.connection.once('open', async () => {
   const { BookModel, syncModelWithCloud } = require('./model/bookModel');
    await syncModelWithCloud();
    console.log('Finished executing SyncModeWithCloud')
  });
})