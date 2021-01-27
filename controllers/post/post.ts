import { Router, Response, Request } from 'express'
import Controller from '../../interfaces/controller'
import { authorization } from '../../middlewares/authorization'
import postModel from '../../models/post'
import reqWithUserData from '../../interfaces/reqWithUserData'
import PostService from './service'
import filterData from '../../interfaces/filterData'

class Post implements Controller {
    public path = '/post'
    public router = Router()
    public postService = new PostService

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.post(`${this.path}/createPost`, authorization, this.createPost)
        this.router.delete(`${this.path}/deletePost`, authorization, this.deletePost)
        this.router.get(`${this.path}/getPosts`, this.getPosts)
        this.router.get(`${this.path}/getPost`, this.getOnePost)
    }

    private createPost = async (req: reqWithUserData, res: Response) => {
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

        const postId = req.body.postId
        const deletedPost = await postModel.findByIdAndRemove(postId)
        if (deletedPost) return res.send(200)
        return res.send(404)
    }

    private getPosts = async (req: Request<{}, {}, {}, filterData>, res: Response) => {

        let { level, category, page }: filterData = req.query

        const numberOfPages = await this.postService.countPosts(level, category)
        const posts = await this.postService.receivePosts(page, level, category)

        if (posts) return res.send({ posts, numberOfPages })
        return res.status(404).send("Posts not found")
    }

    private getOnePost = async (req: Request<{}, {}, {}>, res: Response) => {
        let _id = req.query._id
        const post = await postModel.findById(_id)
            .populate('creator', 'userName')
            .populate({ path: 'comments.commentCreator', select: 'userName' })

        if (post) return res.send(post)
        return res.status(404).send("Posts not found")
    }
}
export default Post