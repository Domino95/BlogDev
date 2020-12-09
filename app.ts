import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import ControllerInterface from './interfaces/controller'
import { errorMiddleware } from './middlewares/error'
require('dotenv').config()

//Declare Env variables
declare const process: {
    env: {
        URL: string,
        PORT: number
    }
}

class App {
    public app: express.Application

    constructor(controllers: ControllerInterface[]) {
        this.app = express()
        this.connectDatabase()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
        this.initializeErrorMidlewares()
        this.returnClient()

    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json({ limit: '10mb' }))
        this.app.use(cookieParser())
        this.app.use(cors())
    }

    private initializeControllers(controllers: ControllerInterface[]) {
        controllers.forEach((item) => {
            this.app.use('/', item.router);
        });
    }
    private initializeErrorMidlewares() {
        this.app.use(errorMiddleware)
    }

    private returnClient() {
        //Static File React
        this.app.use(express.static('client/public'))
        this.app.get('*', function (req: Request, res: Response) {
            res.sendFile(path.join(__dirname, '../client', 'public', 'index.html'))
        })
    }

    private connectDatabase() {
        //Database connect
        mongoose.connect(process.env.URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            (error) => {
                if (error) throw error;
                console.log("connected")
            });
    }

    public listen() {
        const PORT = process.env.PORT || 3000
        this.app.listen(PORT, () => {
            console.log("succes")
        })
    }

}
export default App