const express = require('express')
const app = express()
const port = 4500
const mysql = require('mysql')
require('dotenv').config()

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD
})


con.connect(err => {
    if (err) throw err
    console.log('Connected to DB!')
    con.query('CREATE DATABASE pokemongames', (err, result) => {
        if (err) throw err
        console.log('DB created')
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
