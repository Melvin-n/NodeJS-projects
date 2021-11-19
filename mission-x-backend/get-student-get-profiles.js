const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
require('dotenv').config()
const port = 4000

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

db.connect(err => {
    if (err) throw err
    console.log('Connect to database successfully')
})

app.get('/get-students/:teacher_id', (req, res) => {

    const teacher_id = req.params.teacher_id
    const selectQuery = `SELECT students.student_id, students.name, students.profile_pic, students.email FROM missio20_team6.students
    JOIN teachers ON students.teacher_id=teachers.teacher_id
    WHERE teachers.teacher_id = ?
    ;`

    db.query(selectQuery, [teacher_id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send('Error')
        } else {
            res.send(result)
        }
    })
})

app.get('/get-profile/teacher/:user_id', (req, res) => {
    const id = req.params.user_id
    const selectQuery = `SELECT name, email, school, profile_pic, date_of_birth, contact_number FROM teachers
    WHERE teacher_id = ?;`

    db.query(selectQuery, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send('Error')
        } else {
            res.send(result)
        }
    })

})

app.get('/get-profile/student/:user_id', (req, res) => {
    const id = req.params.user_id
    const selectQuery = `SELECT name, email, school, profile_pic, date_of_birth, contact_number FROM students
    WHERE student_id = ?;`

    db.query(selectQuery, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send('Error')
        } else {
            res.send(result)
        }
    })

})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})