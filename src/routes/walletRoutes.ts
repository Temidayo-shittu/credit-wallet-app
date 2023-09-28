// src/routes/walletRoutes.ts

import { Router } from 'express';
import { performTransaction, getAllTransactions, getTransactionById } from '../controllers/WalletController';


const router = Router();

router.post('/fund', performTransaction);
router.get('/allTransactions', getAllTransactions);
router.get('/:id', getTransactionById);


export default router;
