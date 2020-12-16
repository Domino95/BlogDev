import { Request, Response, Router } from 'express'
import { userModel } from '../../models/user'
import Controller from '../../interfaces/controller'
import bcrypt from 'bcrypt'
import AuthenticationService from './service'

class Authentication implements Controller {
    public path = '/authentication'
    public router = Router()
    public authenticationService = new AuthenticationService

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
        this.router.get(`${this.path}/logout`, this.logout)
    }

    private register = async (req: Request, res: Response) => {
        try {
            const { email, userName, password, repeatPassword } = req.body

            const user = await userModel.findOne({ email })
            if (user) return res.status(400).json({ msg: "User arleady exists" })

            if (password !== repeatPassword) return res.status(400).json({ msg: "Passwords are not correct" })
            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new userModel({
                email,
                userName,
                password: hashedPassword
            })

            await newUser.save()

            const accesToken = this.authenticationService.createAccesToken(newUser)

            res.cookie('accesToken', accesToken, {
                maxAge: 60 * 60 * 72 * 1000,
                sameSite: true,
                secure: false
            })

            res.json({ email: newUser.email, userName: newUser.userName })

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    private login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await userModel.findOne({ email })
            if (!user) return res.status(400).json({ msg: 'email or password are not correct' })

            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) return res.status(400).json({ msg: 'email or password are not correct' })

            const accesToken = this.authenticationService.createAccesToken(user)


            res.cookie('accesToken', accesToken, {
                maxAge: 60 * 60 * 72 * 1000,
                sameSite: true,
                secure: false
            })



            res.json({ email: user.email, userName: user.userName })


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    private logout = async (req: Request, res: Response) => {
        try {
            res.clearCookie('accesToken')
            return res.json({ msg: "Logged out" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
export default Authentication
