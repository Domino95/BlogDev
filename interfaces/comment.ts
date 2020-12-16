import { Types } from 'mongoose'
import userInterface from './user'

interface Comment {
    _id: string
    content: String
    creator: Types.ObjectId | userInterface
}
export default Comment