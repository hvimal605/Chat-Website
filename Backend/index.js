const express = require('express')

const user = require('./routes/user')
const message =require('./routes/message')
const {app , server} = require('./socketIO/server')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const { cloudinaryConnect } = require('./config/clodinary')

app.use(express.json())
app.use(cookieParser())

app.use(
  fileUpload({
      useTempFiles:true,
      tempFileDir:'/tmp',
  })
)

cloudinaryConnect()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  

app.use(cors())
require("dotenv").config()
const port = process.env.PORT||4000

app.get('/', (req, res) => {
  res.send(`<h1>server is ruunig up</h1>`)
})

const db = require('./config/database')

db.dbConnect()


app.use("/api/user",user)
app.use("/api/message",message)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})