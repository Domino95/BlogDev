const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    res.status(404).send("<h1>PAGE NOT FOUND 404</h1>")
})


module.exports = router