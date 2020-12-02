const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/users')
const PORT = process.env.PORT || 3000
const app = express()



app.use(bodyParser.json())
app.use(router)
router.use(function (req, res,) {
    res.status(404).send("<h1>PAGE NOT FOUND 404</h1>")
})

app.listen(PORT, () => {
    console.log("succes")
})




