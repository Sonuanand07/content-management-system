import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import pageRoutes from './routes/pages.js';
import demoRoutes from './routes/demo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: '*', // Allow all origins
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/demo', demoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const start = async () => {
  try {
    console.log('[v0] Starting server...');
    const dbConnected = await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`[v0] Server running on http://localhost:${PORT}`);
      if (!dbConnected) {
        console.warn('[v0] Database not connected - using demo/API mode only');
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('[v0] SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('[v0] HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('[v0] Failed to start server:', error);
    process.exit(1);
  }
};

start();
