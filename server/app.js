const express = require('express');
const morgan = require('morgan')
const cors = require("cors")
const user = require('./routes/user')
const admin = require('./routes/admin')
const db =require('./config/mongooseConfig')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
db.connect().then(()=>{
    console.log('connected to  MongoDB')
  }).catch((err)=>{
    console.log(err)
  })
app.use('/',user)
app.use('/admin',admin)

app.listen(3001,()=>{
    console.log('listening on 3001')
})