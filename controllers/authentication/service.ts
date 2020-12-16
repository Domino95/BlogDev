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
        const { _id, userName } = user
        return jwt.sign({ _id, userName }, `${process.env.SECRET_ACCES_TOKEN}`, { expiresIn: "72h" })
    }

    public createRefreshToken(user: userInterface) {
        const { _id, userName } = user
        return jwt.sign({ _id, userName }, `${process.env.REFERSH_ACCES_TOKEN}`, { expiresIn: "30d" })
    }

}
export default AuthenticationService