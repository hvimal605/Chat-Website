const express = require('express');
const user = require('./routes/user');
const message = require('./routes/message');
const { app, server } = require('./socketIO/server'); // Adjust this path as per your structure
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require('./config/cloudinary');
const db = require('./config/database');
require("dotenv").config();

// Connect to database
db.dbConnect();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
  })
);

// Cloudinary setup
cloudinaryConnect();

// CORS configuration
const allowedOrigins = [
  'https://harshspark-chat-web.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Server is running up</h1>');
});

app.use("/api/user", user);
app.use("/api/message", message);

// Start server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
