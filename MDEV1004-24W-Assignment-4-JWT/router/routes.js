/*
 * Filename: routes.js
 * Amardeep Amardeep - 200567064
 * Yamuna Ravi Thalakatt - 200506480
 * Date: 03 April 2024
 */

require("dotenv").config();
const express = require("express")
const app = express();
app.use(express.json());
const bookController = require("../controller/controller");
const authToken = require("../middleware/authToken")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
// Create an instance of the Express Router
const router = express.Router();

// API Endpoints to perform the CRUD operations
// 1.API Endpoint to fetch all books 
router.get('/getAllBooks', bookController.getAllBooks, authToken);

// 2.API Endpoint to fetch one specific book using ID
router.get('/getBookByID/:id', bookController.getBookByID, authToken);

// 3.API Endpoint to create a new book  
router.post('/createBook', bookController.createBook, authToken);

// 4.API Endpoint to update the book by ID
router.put('/updateBook/:id', bookController.updateBook, authToken);

// 5.API Endpoint to delete a book using ID
router.delete('/deleteBookByID/:id', bookController.deleteBookByID, authToken);

//register
router.post("/register", bookController.registerUser, authToken);

//login
router.post("/login", bookController.loginUser, authToken);

module.exports = router;