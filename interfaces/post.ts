import Comment from './comment'
import { Types } from 'mongoose'
import User from './user'

interface Post {
    _id: string
    creator: Types.ObjectId | User
    title: string
    content: string
    category: string
    level: string
    comments?: Comment[]
}
export default Post