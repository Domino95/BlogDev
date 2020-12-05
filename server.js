const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()


app.use(fileUpload({ useTempFiles: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())



//Routes
app.use('/user', require('./routes/user'))


//Static File React
app.use(express.static('client/public'))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})


//Database connect
mongoose.connect(process.env.URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (error) => {
        if (error) throw error;
        console.log("connected")
    });



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("succes")
})




