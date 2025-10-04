import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Book } from '../models/Book.js';
import { Review } from '../models/Review.js';

export async function createBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, author, description, genre, year } = req.body;
  const book = await Book.create({ title, author, description, genre, year, addedBy: req.user.id });
  return res.status(201).json(book);
}

export async function updateBook(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  const { title, author, description, genre, year } = req.body;
  book.title = title ?? book.title;
  book.author = author ?? book.author;
  book.description = description ?? book.description;
  book.genre = genre ?? book.genre;
  book.year = year ?? book.year;
  await book.save();
  return res.json(book);
}

export async function deleteBook(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await Review.deleteMany({ bookId: book._id });
  await book.deleteOne();
  return res.json({ success: true });
}

export async function listBooks(req, res) {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = 5;
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-__v'),
    Book.countDocuments(),
  ]);
  return res.json({ items, page, totalPages: Math.ceil(total / limit), total });
}

export async function getBookDetails(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid id' });
  const book = await Book.findById(req.params.id).lean();
  if (!book) return res.status(404).json({ error: 'Book not found' });
  const reviews = await Review.find({ bookId: book._id }).populate('userId', 'name').lean();
  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  return res.json({ book: { ...book, averageRating: Number(average.toFixed(2)), reviewCount: reviews.length }, reviews });
}


