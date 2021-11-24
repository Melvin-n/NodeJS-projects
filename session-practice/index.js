const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const port = 4000

const oneDay = 1000 * 60 * 60 * 24


//login details
const name = 'user1'
const password = 'password'

//variable to save a session
let session;

//parse incoming data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//serving public file
app.use(express.static(__dirname))

//cookie parser middleware
app.use(cookieParser())

//session middleware with object params
app.use(sessions({
    secret: 'thisismysecretkey', //secret key for sessions, usually saved as .env
    saveUninitialized: true, //saves session even if it hasn't been modified (?)
    cookie: {maxAge : oneDay}, //sets time limit for a cookie
    resave: false //deals with race conditions
}))

//if user is logged in (userid exists) then display logout button, else send login form
app.get('/', (req, res) => {
    session = req.session
    if(session.userid) {
        res.send("Welcome user<a href=\'/logout'>click to logout</a>")
    } else {
        res.sendFile('views/index.html', {root:__dirname})
    }
})

//if user sends accurate login data, create a session with userid == users name. send back welcome page. else send error
app.post('/user', (req, res) => {
    if(req.body.name == name && req.body.password == password) {
        session = req.session
        session.userid = req.body.name
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
 })

 //upon logout, destroy the session, redirect  home
app.get('/logout', (req, res) => {
     req.session.destroy()
     res.redirect('/')
 })

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
