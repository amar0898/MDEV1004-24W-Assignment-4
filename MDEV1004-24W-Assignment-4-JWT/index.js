/*
 * Filename: index.js
 * Amardeep Amardeep - 200567064
 * Yamuna Ravi Thalakatt - 200506480
 * Date: 03 April 2024
 */


const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const http = require("http");
const port = 3000;
app.use(bodyParser.json());

app.listen(port, async ()=>{
    console.log(`server is running on port ${port}`)
})