const express = require('express')
const app = express()
const port = 4500
const mysql = require('mysql')
const { createConnection } = require('net')
const cors = require('cors')
require('dotenv').config()


app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'pokemongames'
})

con.connect(err => {
    if (err) throw err
    console.log('Connected to DB!')
})

app.get('/:generation', (req, res) => {
        con.query('SELECT * FROM games WHERE generation = ?', req.params.generation, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    })    


app.get('/search/:generation', (req, res) => {
    console.log(req.body)
    con.query('SELECT * FROM games WHERE generation = ?', req.params.generation, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
