const Users = require('../models/user')
const bcrypt = require('bcrypt')
const { createAccesToken, createRefreshToken } = require('../helpers/createTokens')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.userController = {

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: 'email or password are not correct' })

            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) return res.status(400).json({ msg: 'email or password are not correct' })

            const accesToken = createAccesToken({ id: user.id })
            const refreshToken = createRefreshToken({ id: user.id })

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refreshToken',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.json({ accesToken })


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    register: async (req, res) => {
        try {
            const { email, userName, password, repeatPassword } = req.body

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "User arleady exists" })

            if (password !== repeatPassword) return res.status(400).json({ msg: "Passwords are not correct" })
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new Users({
                email,
                userName,
                password: hashedPassword
            })

            await newUser.save()

            const accesToken = createAccesToken({ id: newUser.id })
            const refreshToken = createRefreshToken({ id: newUser.id })

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refreshToken',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.json({ accesToken })

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refreshToken' })
            return res.json({ msg: "Logged" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    },

    refreshToken: (req, res) => {
        try {
            const refreshToken = req.cookies.refreshtoken
            if (!refreshToken) return res.status(400).json({ msg: 'Please Login or Register' })

            jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (error, user) => {
                if (error) return res.status(400).json({ msg: 'Please Login or Register' })

                const accesToken = createAccesToken({ id: user.id })

                res.json({ accesToken })
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
