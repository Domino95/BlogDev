import { Response, NextFunction } from "express";
import reqUserId from '../interfaces/reqUserId'
import jwt from 'jsonwebtoken';
import tokenData from '../interfaces/tokenData'
declare const process: {
    env: {
        SECRET_ACCES_TOKEN: string,
    }
}

export const authorization = (req: reqUserId, res: Response, next: NextFunction) => {
    try {
        const accesToken = req.cookies.accesToken
        console.log(accesToken, req.cookies)
        if (!accesToken) return res.status(400).json({ msg: 'invalid authorization cookies' })

        const result = jwt.verify(accesToken, process.env.SECRET_ACCES_TOKEN) as tokenData
        if (!result) return res.status(400).json({ msg: 'invalid authorization token' })
        req.userID = result._id
        next()
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
