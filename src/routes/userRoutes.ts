import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/userController';

const router = Router();


router.get('/allUsers', getAllUsers);
router.get('/:id', getUserById); 

export default router;