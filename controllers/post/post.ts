import { Router, Response, NextFunction } from 'express'
import Controller from '../../interfaces/controller'
import { authorization } from '../../middlewares/authorization'
import postModel from '../../models/post'
import reqWithUserData from '../../interfaces/reqWithUserData'

class Post implements Controller {
    public path = '/post'
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }


    private initializeRoutes = () => {
        this.router.post(`${this.path}/createPost`, authorization, this.createPost)
        this.router.delete(`${this.path}/deletePost`, authorization, this.deletePost)
        this.router.get(`${this.path}/getAllPosts`, this.getAllPosts)
    }


    private createPost = async (req: reqWithUserData, res: Response, next: NextFunction) => {
        try {
            const post = req.body
            const userId = req.userID

            const newPost = new postModel({
                ...post,
                creator: userId,
                comments: []
            })
            const createdPost = await newPost.save()
            await createdPost.populate('creator', 'userName').execPopulate()
            return res.send(createdPost)
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    private deletePost = async (req: reqWithUserData, res: Response) => {
        console.log(req.body)
        const postId = req.body.postId
        const deletedPost = await postModel.findByIdAndRemove(postId)
        if (deletedPost) return res.send(200)
        return res.send(404)
    }

    private getAllPosts = async (req: reqWithUserData, res: Response) => {
        const posts = await postModel.find()
        if (posts.length > 0) return res.send(posts)
        return res.status(404).send("Posts not found")
    }
}


export default Post