const express = require('express')
const app = express()
const port = 4500
const mysql = require('mysql')
require('dotenv').config()


app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.USER,
    database: 'pokemongames'
})


con.connect(err => {
    if (err) throw err
    console.log('Connected to DB!')
    con.query('CREATE TABLE games (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), releaseyear INT, generation INT, coverpokemon VARCHAR(30))', (err, result) => {
        if (err) throw err
        console.log('DB created')
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
