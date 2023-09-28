// src/routes/accountRoutes.ts

import { Router } from 'express';
import { createAccount,getAllAccounts,getAccountById } from '../controllers/AccountController';
//import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);

// Add routes for updating, deleting, etc. if needed

export default router;
