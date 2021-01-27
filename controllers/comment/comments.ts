import Controller from '../../interfaces/controller'
import { authorization } from '../../middlewares/authorization'
import { Router, Response } from 'express'
import reqWithUserData from '../../interfaces/reqWithUserData'
import postModel from '../../models/post'
import mongoose from 'mongoose'

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
        const creatorId = req.userID
        const { postId, commentContent } = req.body

        postModel.findOneAndUpdate({ _id: postId },
            {
                $push: {
                    comments: {
                        _id: mongoose.Types.ObjectId(), commentCreator: creatorId, content: commentContent
                    }
                }
            }, {
            new: true
        })
            .exec(function (error, data) {
                if (error) {
                    return res.status(400).send({ message: 'Failed to add comment' });
                }
                return res.status(200).send(data);
            });
    }

}
export default Comment