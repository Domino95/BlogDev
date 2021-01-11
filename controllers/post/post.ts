import { Router, Response } from 'express'
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
        this.router.post(`${this.path}/getPosts`, this.getPosts)
        this.router.post(`${this.path}/filterPosts`, this.filterPosts)
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
        console.log(req.body)
        const postId = req.body.postId
        const deletedPost = await postModel.findByIdAndRemove(postId)
        if (deletedPost) return res.send(200)
        return res.send(404)
    }

    private filterPosts = async (req: reqWithUserData, res: Response) => {

        let { Level, Category }: filterData = req.body
        const currentPage = "1"

        const numberOfPages = await this.postService.countPosts(Level, Category)
        const posts = await this.postService.receivePosts(currentPage, Level, Category)

        if (posts.length > 0) return res.send({ posts, numberOfPages })
        return res.status(404).send("Posts not found")
    }


    private getPosts = async (req: reqWithUserData, res: Response) => {

        let { Level, Category, currentPage }: filterData = req.body

        const numberOfPages = await this.postService.countPosts(Level, Category)
        const posts = await this.postService.receivePosts(currentPage, Level, Category)

        if (posts.length > 0) return res.send({ posts, numberOfPages })
        return res.status(404).send("Posts not found")
    }
}

export default Post