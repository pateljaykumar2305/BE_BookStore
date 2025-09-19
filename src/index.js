import dotenv from 'dotenv';
dotenv.config();
// Load environment file based on NODE_ENV

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import { notFoundHandler, errorHandler } from './middleware/error.js';
const app = express();

// Load environment file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : process.env.NODE_ENV === 'development'
    ? '.env.development'
    : '.env';
dotenv.config({ path: envFile });

// Core middleware
app.use(express.json());
app.use(cors());

app.use(cookieParser());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (_req, res) => {
  return res.status(200).json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  return res.status(200).json({ status: 'localhost is working' });
});

// Routes
app.use('/api/auth', authRoutes);
// Alias so /api/register and /api/login also work
app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);


// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Start server (with or without DB)
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('✅ Database connected');
  } catch (error) {
    console.log('⚠️  Database not available, running without DB');
    console.log('💡 Some features may not work until MongoDB is connected');
  }
  
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📋 Available endpoints:');
  });
};

startServer();

export default app;


