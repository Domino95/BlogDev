import { Request } from 'express';

interface reqUserId extends Request {
    userID: string
}

export default reqUserId;