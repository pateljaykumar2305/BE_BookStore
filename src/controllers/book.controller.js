import mongoose from 'mongoose';
import Book from '../models/Book.js';

export const getBooks = async (_req, res, next) => {
  try {
    // Check if DB is connected
    if (!mongoose.connection.readyState) {
      return res.status(503).json({ 
        message: 'Database not available. Please connect MongoDB first.' 
      });
    }
    
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (err) {
    return next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
   
    const { title, author } = req.body;
    
    const book = await Book.create({ title, author, user: req.user?.id });
    return res.status(201).json(book);
  } catch (err) {
    return next(err);
  }
};




