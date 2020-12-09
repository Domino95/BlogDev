import httpException from '../exceptions/httpError'
import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (error: httpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500
    const message = error.message || "Something went wrong..."
    res.status(status).send({ status, message })
}