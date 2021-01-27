import { Types } from 'mongoose'

interface Comment {
    _id: Types.ObjectId
    content: String
    commentCreator: string | Types.ObjectId
}
export default Comment