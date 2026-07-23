import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cms';
    console.log('[v0] Connecting to MongoDB:', mongoUri.replace(/:[^:]*@/, ':****@'));
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log('[v0] MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('[v0] MongoDB connection failed:', error.message);
    console.warn('[v0] Running in API-only mode without database persistence');
    // Don't exit - allow the server to run anyway
    return false;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection failed:', error);
  }
};
