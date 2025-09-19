import { Router } from 'express';
import { body } from 'express-validator';
import { getBooks, createBook } from '../controllers/book.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', authenticate ,getBooks);

router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  validate,
  createBook
);

export default router;


