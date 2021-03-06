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



// con.connect(err => {
//     if (err) throw err
//     console.log('Connected to DB!')
//     con.query('SELECT name FROM games', (err, result) => {
//         if (err) throw err
//         console.log(result)
//     })
//     con.end()
// })



app.get('/', (req, res) => {
    con.connect(err => {
        if (err) throw err
        console.log('Connected to DB!')
        con.query('DELETE FROM games WHERE id > 8', (err, result) => {
            if (err) throw err
            res.send(result)
        })
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
