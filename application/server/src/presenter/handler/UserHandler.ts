import { Request, Response, NextFunction } from 'express'

class UserHandler {
  create = async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    res.send('hello world')
  }
}

export default UserHandler