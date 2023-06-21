import mongoose from 'mongoose'
const uriAtlas='mongodb+srv://admin:2OCpWXornrvcp8fc@cluster0.pe9ii90.mongodb.net/howler?retryWrites=true&w=majority'
const uriLocal='mongodb://127.0.0.1:27017/dbtest';
const MONGODB_URI =
  process.env.MONGODB_URI || uriLocal

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/*
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
