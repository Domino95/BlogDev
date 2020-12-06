const express = require('express')
const router = express.Router()
const { userController } = require('../controllers/userController')

router.post('/login', userController.login)

router.post('/register', userController.register)

router.post('/logout', userController.logout)

router.get('/refreshToken', userController.refreshToken)

module.exports = router