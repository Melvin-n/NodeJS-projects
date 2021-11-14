const express = require('express')
const app = express()
const port = 4500
const mysql = require('mysql')
const { createConnection } = require('net')

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
