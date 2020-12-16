import { Request } from 'express';

interface reqWithUserData extends Request {
    userID: string
    userName: string
}

export default reqWithUserData;