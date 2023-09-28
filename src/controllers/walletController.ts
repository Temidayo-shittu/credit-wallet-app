import { Request, Response } from 'express';
import db from '../db/connection';


 export const performTransaction = async (req: Request, res: Response): Promise<any>=>{
    const { amount, transactionType, senderAccountId, receiverAccountId } = req.body;
    console.log(req.body)

    try {
      await db.transaction(async (trx) => {
        if (transactionType === 'withdrawal') {
          const senderAccount = await trx('accounts').where({ id: senderAccountId }).first();
          console.log(senderAccount)

          if (!senderAccount) {
            return res.status(404).json({ message: 'Sender Account not found' });
          }

          if (senderAccount.accBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds for withdrawal' });
          }
          console.log(senderAccount.accBalance,amount)

          const [walletId] = await trx('wallets').insert({
            amount: -amount, // Negative amount for withdrawal
            transactionType: transactionType,
            senderAccountId: senderAccountId,
          });
          const wallet = await trx('wallets').where({ id: walletId }).first();
          console.log(wallet)
          const newSenderAccount = await trx('accounts').where({ id: senderAccountId }).decrement('accBalance', amount);
          console.log(newSenderAccount)
        
        }

         if (transactionType === 'deposit') {
          const receiverAccount = await trx('accounts').where({ id: receiverAccountId }).first();
          if (!receiverAccount) {
            return res.status(404).json({ message: 'Receiver account not found' });
          }

          const senderAccount = await trx('accounts').where({ id: senderAccountId }).first();
          if (!senderAccount) {
            return res.status(404).json({ message: 'Sender Account not found' });
          }

          if(senderAccountId === receiverAccountId) {
            const [walletId] = await trx('wallets').insert({
              amount,
              transactionType: transactionType,
              senderAccountId: senderAccountId,
              receiverAccountId: receiverAccountId,
            });
            const wallet = await trx('wallets').where({ id: walletId }).first();
            console.log(wallet)
            const newReceiverAccount = await trx('accounts').where({ id: receiverAccountId }).increment('accBalance', amount);
          //  const newSenderAccount = await trx('accounts').where({ id: senderAccountId }).decrement('accBalance', amount);
            console.log(newReceiverAccount)
          }

          if (senderAccountId !== receiverAccountId && senderAccount.accBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds for deposit' });
          }
          if (senderAccountId !== receiverAccountId && senderAccount.accBalance > amount){
            const [walletId] = await trx('wallets').insert({
              amount,
              transactionType: transactionType,
              senderAccountId: senderAccountId,
              receiverAccountId: receiverAccountId,
            });
            const wallet = await trx('wallets').where({ id: walletId }).first();
            console.log(wallet)
            const newReceiverAccount = await trx('accounts').where({ id: receiverAccountId }).increment('accBalance', amount);
            const newSenderAccount = await trx('accounts').where({ id: senderAccountId }).decrement('accBalance', amount);
            console.log(newReceiverAccount,newSenderAccount)

          }
        }

        return res.json({ 
          message: 'Transaction completed successfully'
         });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const getAllTransactions = async (req: Request, res: Response) => {
    try {
      const wallets = await db('wallets');
      return res.json({ 
        message: 'Successfully Retrieved All Transactions',
        wallets
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getTransactionById = async (req: Request, res: Response) => {
    // const { accountId } = req.params
     try {
       const wallet = await db('wallets').where({ id: req.params.id }).first();
       if (!wallet) {
         return res.status(404).json({ message: 'Transaction Not Found' });
       }
       return res.json({ 
         message: 'Successfully Retrieved Transaction',
         wallet
       });
     } catch (error) {
       return res.status(500).json({ message: 'Internal server error' });
     }
   };


