import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getUserBooks, getUserReviews } from '../controllers/user.controller.js';

const router = Router();

router.get('/:userId/books', requireAuth, getUserBooks);
router.get('/:userId/reviews', requireAuth, getUserReviews);

export default router;
