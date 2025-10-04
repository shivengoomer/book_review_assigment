import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { signup, login, me } from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/signup',
  [
    body('name').isString().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  signup
);

router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').isString()], login);

router.get('/me', requireAuth, me);

export default router;


