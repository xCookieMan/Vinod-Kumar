import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = globalThis as typeof globalThis & { mongoose?: MongooseCache };

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI || '';

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable.');
  }

  const mongooseCache = cached.mongoose!;

  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }
  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose.connect(MONGODB_URI, { dbName: 'vinod_kumar_portfolio' });
  }
  mongooseCache.conn = await mongooseCache.promise;
  return mongooseCache.conn;
}

export default dbConnect;
