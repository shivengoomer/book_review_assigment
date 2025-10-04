import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Review } from '../models/Review.js';
import { Book } from '../models/Book.js';

async function recomputeBookStats(bookId) {
  const stats = await Review.aggregate([
    { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: '$bookId', averageRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } },
  ]);
  const { averageRating = 0, reviewCount = 0 } = stats[0] || {};
  await Book.findByIdAndUpdate(bookId, { averageRating, reviewCount }, { new: true });
}

export async function addOrUpdateReview(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { rating, reviewText } = req.body;
  const { bookId } = req.params;
  const review = await Review.findOneAndUpdate(
    { bookId, userId: req.user.id },
    { rating, reviewText },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await recomputeBookStats(bookId);
  return res.status(201).json(review);
}

export async function deleteReview(req, res) {
  const { bookId } = req.params;
  const review = await Review.findOne({ bookId, userId: req.user.id });
  if (!review) return res.status(404).json({ error: 'Review not found' });
  await review.deleteOne();
  await recomputeBookStats(bookId);
  return res.json({ success: true });
}


