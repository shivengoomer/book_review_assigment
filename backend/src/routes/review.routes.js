import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { addOrUpdateReview, deleteReview } from '../controllers/review.controller.js';
import { Review } from '../models/Review.js';

const router = Router();

router.post(
  '/:bookId',
  requireAuth,
  [body('rating').isInt({ min: 1, max: 5 }), body('reviewText').optional().isString()],
  addOrUpdateReview
);
router.get('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.delete('/:bookId', requireAuth, deleteReview);

export default router;


