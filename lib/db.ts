// express
//step-1 connectDb function
//step-2 mongoose.connect('mongodburl')

// How to connect Mongo DB in Next JS
// two field connection&promise

import { connect } from "mongoose";

let mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) {
  throw new Error("Mongodb url is not found.");
}

//As browser inside window global hota hai ,Vaise Next.js&nodejs ke backend me global hota hai
//global is object
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }; //mongoose type define types.d.ts file inside
}

const connectDb = async ()=> {
  if (cached.conn) {
    console.log("cached db connected")
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = connect(mongodbUrl).then((c) => c.connection); 
  }
  try {
    cached.conn = await cached.promise;
    console.log("db connected !")
  } catch (error) {
    throw error;
  }
  return cached.conn;
};
export default connectDb;
