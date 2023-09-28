import { Request, Response } from 'express';
import db from '../db/connection';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await db('users');
      return res.json({ 
        message: 'Successfully Retrieved All Users',
        users
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getUserById = async (req: Request, res: Response) => {
   // const { accountId } = req.params
    try {
      const user = await db('users').where({ id: req.params.id }).first();
      if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
      }
      return res.json({ 
        message: 'Successfully Retrieved User',
        user
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };