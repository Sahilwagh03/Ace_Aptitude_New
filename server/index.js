const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const router = require('./routers/router')
const passport = require('passport')
const session = require('express-session');
require('./config/dbconnect')


dotenv.config()

const app = express()

//MiddlleWares
app.use(session({
    secret: 'Ace_Aptitude', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    // Other session options as needed
}));
app.use(express.json())
//This is used to solve the issue of api when we fetch on browser reject the request becuase of differnt ports
app.use(cors(
    // {
    //     origin: 'https://ace-aptitude-psi.vercel.app',
    //     methods: 'GET,POST,PUT,DELETE',
    //     credentials: true
    // }
))
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/api', router)

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(5000)