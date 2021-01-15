import Controller from '../../interfaces/controller'
import { authorization } from '../../middlewares/authorization'
import { Router, Response } from 'express'
import reqWithUserData from '../../interfaces/reqWithUserData'
import postModel from '../../models/post'


class Comment implements Controller {
    public path = '/comment'
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.post(`${this.path}/add`, authorization, this.addComment)
    }

    private addComment = async (req: reqWithUserData, res: Response) => {
    }

}
export default Comment