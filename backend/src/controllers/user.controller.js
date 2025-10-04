import { Book } from '../models/Book.js';
import { Review } from '../models/Review.js';
import mongoose from 'mongoose';

/**
 * GET /users/:userId/books
 * Fetch all books created by a specific user
 */
export async function getUserBooks(req, res) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ error: 'Invalid user ID' });

  try {
    const books = await Book.find({ addedBy: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(books);
  } catch (err) {
    console.error('Error fetching user books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}

/**
 * GET /users/:userId/reviews
 * Fetch all reviews written by a specific user, include book info
 */
export async function getUserReviews(req, res) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ error: 'Invalid user ID' });

  try {
    // Fetch all reviews by this user and populate related book info
    const reviews = await Review.find({ userId })
      .populate('bookId', 'title author') // fetch title & author from Book
      .sort({ createdAt: -1 })
      .lean();

    // Add simplified bookTitle + author fields
    const formatted = reviews.map((r) => ({
      _id: r._id,
      content: r.reviewText || '',
      rating: r.rating,
      bookId: r.bookId?._id,
      bookTitle: r.bookId?.title,
      bookAuthor: r.bookId?.author,
      createdAt: r.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching user reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
