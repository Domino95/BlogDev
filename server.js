const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./routes/users')
const app = express()



app.use(fileUpload({ useTempFiles: true }))
app.use(bodyParser.json())
app.use(router)
app.use(express.static('client/public'))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("succes")
})




