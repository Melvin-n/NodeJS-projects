const express = require('express')
const app = express()
const port = 4500
const mysql = require('mysql')

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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
        con.query('SELECT name FROM games WHERE generation = 2 ORDER BY releaseyear', (err, result) => {
            if (err) throw err
            res.send(result)
        })
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
