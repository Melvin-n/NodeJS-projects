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

const values = [
    ['pokemon red', 1996, 1, 'charizard'],
    ['pokemon blue', 1996, 1, 'blastoise'],
    ['pokemon yellow', 1998, 1, 'pikachu'],
    ['pokemon silver', 1999, 2, 'lugia'],
    ['pokemon gold', 1999, 2, 'ho-oh'],
    ['pokemon crystal', 2000, 2, 'suicune'],
    ['pokemon ruby', 2002, 3, 'groudon'],
    ['pokemon sapphire', 2002, 3, 'kyogre']
]

con.connect(err => {
    if (err) throw err
    console.log('Connected to DB!')
    const insertQuery = 'INSERT INTO games (name, releaseyear, generation, coverpokemon) VALUES ?'
    con.query(insertQuery, [values], (err, result) => {
        if (err) throw err
        console.log(`record inserted: ${result.affectedRows}`)
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
