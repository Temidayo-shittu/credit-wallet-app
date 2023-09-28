// src/controllers/AccountController.ts

import { Request, Response } from 'express';
import db from '../db/connection';

export const createAccount = async (req: Request, res: Response) => {
  const { accName, bankAccount, accBalance } = req.body;

  try {
    // Assuming userId is available in the request body
    const userId = req.body.userId;

    // Check if the user exists (optional, depends on your use case)
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    // Insert the account
    const [accountId] = await db('accounts').insert({
      accName,
      bankAccount,
      accBalance,
      user_id: userId,
    });

    const account = await db('accounts').where({ id: accountId }).first();

    return res.json({ 
      message: 'Successfully Created Account',
      account
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await db('accounts');
    return res.json({ 
      message: 'Successfully Retrieved All Accounts',
      accounts
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
 // const { accountId } = req.params
  try {
    const account = await db('accounts').where({ id: req.params.id }).first();
    if (!account) {
      return res.status(404).json({ message: 'Account Not Found' });
    }
    return res.json({ 
      message: 'Successfully Retrieved Account',
      account
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
