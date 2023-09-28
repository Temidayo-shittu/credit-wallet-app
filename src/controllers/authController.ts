import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import db from '../db/connection';


  export const signup = async (req: Request, res: Response)=> {

    const { fullname, email, password } = req.body;
    console.log(fullname, email, password)

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
      const [userId] = await db('users').insert({ fullname, email, password: hashedPassword });
      const user = await db('users').where({ id: userId }).first(); // Retrieve user details

      // Create a sanitized user object without the password
    const sanitizedUser = { 
      id: user.id, 
      fullname: user.fullname, 
      email: user.email 
    };
      const token = generateToken(userId);
      return res.json({ 
        message: 'Successfully Signed up User',
        user: sanitizedUser, 
        token 
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const login = async (req: Request, res: Response)=> {
    
    const { email, password } = req.body;
    
    try {
      const user = await db('users').where({ email }).first();

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
     // const tokenUser= createTokenUser(user)
     const sanitizedUser = { 
      id: user.id, 
      fullname: user.fullname, 
      email: user.email 
    };
      const token = generateToken(user.id);
      return res.json({ 
        message: "Successfully Logged In",
        user: sanitizedUser, 
        token
     });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
