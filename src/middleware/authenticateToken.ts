import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) {
        res.status(403).json({ message: 'Forbidden' });
      } else {
        req.user = { id: (payload as { id: number }).id };
        next();
      }
    });
  }
}


/*
export function authenticateToken(req: Request, res: Response, next: NextFunction){
    const token= req.signedCookies.token
    if(!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }
    try {
        const {id}= verifyToken(token)
        req.user= {id}
        next()
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
}
*/







