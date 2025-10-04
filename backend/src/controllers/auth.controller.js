import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already exists' });
  const user = await User.create({ name, email, password });
  const token = createToken(user._id.toString());
  return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await user.comparePassword(password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = createToken(user._id.toString());
  return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('name email');
  return res.json({ user: { id: user._id, name: user.name, email: user.email } });
}


