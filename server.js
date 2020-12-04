const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()

app.use(fileUpload({ useTempFiles: true }))
app.use(bodyParser.json())



//Routes
app.use('/user', require('./routes/user'))


//Static File React
app.use(express.static('client/public'))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("succes")
})




