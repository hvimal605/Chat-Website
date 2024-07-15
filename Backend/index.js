const express = require('express');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const { app, server } = require('./socketIO/server'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const db = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
require("dotenv").config();

// Connect to database
db.dbConnect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp',
}));

// Cloudinary setup
cloudinaryConnect();

// CORS configuration
const allowedOrigins = ["https://harshspark-chat-web.netlify.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Server is running up</h1>');
});

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// Start server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
