const express = require('express')
const app = express()
const fs = require('fs')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.redirect('http://127.0.0.1:5500/Mission%20Ready/mockup-x/homepage.html')
})

//****CURRENT DATABASE IS JSON FILE, NEEDS TO BE CHANGED****

//register takes data and pushed it into the database 
app.post('/register', (req, res) => {
    let users = fs.readFileSync('users.json', 'utf-8')
    users = JSON.parse(users)
    users.push(req.body)
    
    try {
        fs.writeFile('users.json', JSON.stringify(users), () => {
            res.send('registered successfully')   
        })
    } catch (err) {
        res.send(err)
    }   
})

//check login details against database for a match, if match found return success else return 500 error
app.post('/login', (req, res) =>{
    let users = fs.readFileSync('users.json', 'utf-8')
    users = JSON.parse(users)
    for (let i = 0; i < users.length; i++){
        if (req.body.name == users[i].name && req.body.password == users[i].password) {
            return res.status(200).send(`Logged in successfully as ${users[i].userType}: ${req.body.name}`)
        }    
    }
    return res.status(500).send(`User name or password incorrect`)
    
})

app.listen(4000, () => {
    console.log('Server is listening on port 4000...')
})