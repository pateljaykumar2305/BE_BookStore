import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://JayPatel:v9aHQwzpBlLCPPCp@atlascluster.r4fzzjw.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'; 
  
  console.log('Connecting to MongoDB:', mongoUri);
  
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running locally or use MongoDB Atlas');
    throw error;
  }
};


