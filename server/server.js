const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const router = require('./routers/router')
require('./config/dbconnect')


dotenv.config()

const app = express()
//MiddlleWares
app.use(express.json())
//This is used to solve the issue of api when we fetch on browser reject the request becuase of differnt ports
app.use(cors()) 
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api' , router)

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(5000)