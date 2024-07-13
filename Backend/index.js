const express = require('express');
const user = require('./routes/user');
const message = require('./routes/message');
const { app } = require('./index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require('./config/clodinary');
const { dbConnect } = require('./config/database'); // Assuming dbConnect is a function to connect to the database

const { server, io } = require('./socketIO/server'); // Adjust the path as per your actual directory structure

app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
  })
);

cloudinaryConnect(); // Assuming this function connects to Cloudinary

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  

app.use(cors());
require('dotenv').config();

const port = process.env.PORT || 4000;
const frontendURL = 'https://harshspark-chat-web.netlify.app'; // Replace with your actual frontend URL

app.get('/', (req, res) => {
  res.send(`<h1>Server is running up</h1>`);
});

// Connect to database
dbConnect();

app.use('/api/user', user);
app.use('/api/message', message);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
  console.log(`Socket.IO is configured to allow connections from ${frontendURL}`);
});
