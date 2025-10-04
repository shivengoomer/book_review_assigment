import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { createBook, updateBook, deleteBook, listBooks, getBookDetails } from '../controllers/book.controller.js';

const router = Router();

router.get('/', listBooks);
router.get('/:id', getBookDetails);

router.post(
  '/',
  requireAuth,
  [
    body('title').isString().isLength({ min: 1 }),
    body('author').isString().isLength({ min: 1 }),
    body('genre').isString().isLength({ min: 1 }),
    body('year').isInt({ min: 0 }),
  ],
  createBook
);

router.get('/:id/books', requireAuth, async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.params.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

router.put('/:id', requireAuth, updateBook);

router.delete('/:id', requireAuth, deleteBook);

export default router;


