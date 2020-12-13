import jwt from 'jsonwebtoken'
import userInterface from '../../interfaces/user'
declare const process: {
    env: {
        SECRET_ACCES_TOKEN: string,
        REFERSH_ACCES_TOKEN: string
    }
}

class AuthenticationService {

    public createAccesToken(user: userInterface) {
        const userId = { _id: user._id }
        return jwt.sign(userId, `${process.env.SECRET_ACCES_TOKEN}`, { expiresIn: "72h" })
    }

    public createRefreshToken(user: userInterface) {
        const userId = { _id: user._id }
        return jwt.sign(userId, `${process.env.REFERSH_ACCES_TOKEN}`, { expiresIn: "30d" })
    }

}
export default AuthenticationService