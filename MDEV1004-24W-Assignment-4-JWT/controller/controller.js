/*
 * Filename: controller.js
 * Amardeep Amardeep - 200567064
 * Yamuna Ravi Thalakatt - 200506480
 * Date: 03 April 2024
 */

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userModel");
const express = require("express")
const app = express();
app.use(express.json());
const { BookModel, syncModelWithCloud } = require("../model/bookModel"); // Importing the BookModel and syncModelWithCloud from the bookModel module

// 1. function to fetch all books 
exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    
    //display the result into tabular format
    res.json(books)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Function to fetch one specific book using ID
exports.getBookByID = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 3. Function to create a new book  
exports.createBook = async (req, res) => {
  const bookData = req.body;
  try {
    const newBook = await BookModel.create(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Function to update the book by ID
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBookData = req.body;
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(id, updatedBookData, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Function to delete a book using ID
exports.deleteBookByID = async (req, res) => {
  const { id } = req.params;
  try {
    await BookModel.findByIdAndDelete(id);
    res.json({ message: 'book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
        try{
          // fetching user information
          const {firstname,lastname,email,password} = req.body;
  
          // validating user information
          if(!(email && password && lastname && firstname)){
              res.status(400).json({error : "All fields are required"})
          }
  
          // checking if whether the user already exists in the database
          const CheckUser = await UserModel.findOne({email});
          if(CheckUser){
              return res.json({user : "user is already registered"})
          }
          // Encrypting the user password
          encryptedPassword = await bcrypt.hash(password, 12)
  
          // Creating the user in mongo database
          const user = await UserModel.create({
              firstname,
              lastname,
              email: email.toLowerCase(),
              password: encryptedPassword
          })

          // Create a signed JWT token for security 
          const token = jwt.sign(
            { user_id:user._id,email}, 
            process.env.TOKEN_KEY, 
            { expiresIn: "15m" }); 

         //saving the token in db 
          user.token = token;
          res.status(201).json(user);
      }
  
      catch(err){
          console.log(err);
      }
};

exports.loginUser = async (req, res) => {
        // fetching user information
        try{
          const{email,password} = req.body;

          // validating user information
          if(!(email && password)){
              res.status(400).send("Dont keep the fields blanks")
          }

          // checking if whether the user already exists in the database
          const user = await UserModel.findOne({email});

          // validating the user password with the hashed encrypted password stored in the database
          if(user && (bcrypt.compareSync(password, user.password))){
            //creating a JWT token for security 
            const token = jwt.sign(
              { user_id:user._id,email}, 
              process.env.TOKEN_KEY, 
              { expiresIn: "15m" }); 
              user.token = token;
              res.status(201).json(user)
          }
          else {
              // Invalid credentials
              res.status(401).json({error : 'Invalid password or email'});
          }
  
      }
      catch(err){
          console.log(err);
      }

};