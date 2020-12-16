import { Response, NextFunction } from "express";
import reqWithUserData from '../interfaces/reqWithUserData'
import jwt from 'jsonwebtoken';
import tokenData from '../interfaces/tokenData'
declare const process: {
    env: {
        SECRET_ACCES_TOKEN: string,
    }
}

export const authorization = (req: reqWithUserData, res: Response, next: NextFunction) => {
    try {
        const accesToken = req.cookies.accesToken
        console.log(accesToken, req.cookies)
        if (!accesToken) return res.status(400).json({ msg: 'invalid authorization cookies' })

        const result = jwt.verify(accesToken, process.env.SECRET_ACCES_TOKEN) as tokenData
        if (!result) return res.status(400).json({ msg: 'invalid authorization token' })
        console.log("result", result)
        req.userID = result._id
        req.userName = result.userName
        next()
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
