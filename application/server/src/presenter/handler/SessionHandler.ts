import { Request, Response, NextFunction } from 'express'

class SessionHandler {
  login = async(req: Request, res: Response, next: NextFunction) => {
    res.send('hello world')
  }
}

export default SessionHandler