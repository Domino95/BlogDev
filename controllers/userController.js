const Users = require('../models/user')
const bcrypt = require('bcrypt')
const { createAccesToken, createRefreshToken } = require('../helpers/createTokens')
exports.userController = {

    login: function () {
        console.log("login")
    },

    register: async function (req, res) {
        try {
            const { email, userName, password, repeatPassword } = req.body

            const user = await Users.findOne({ email })
            if (user) throw new Error("User arleady exists")

            if (password !== repeatPassword) throw new Error("Passwords are not correct")
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
                path: '/user/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.json({ accesToken })

        }
        catch (error) {
            console.log(error)
        }
    }
}
