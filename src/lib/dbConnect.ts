import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

declare global {
  var mongooseConnection: ConnectionObject | undefined;
}

async function dbConnect(): Promise<void> {
  if (globalThis.mongooseConnection?.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {});

    globalThis.mongooseConnection = {
      isConnected: db.connections[0].readyState,
    };

    console.log("DB connected succesfully");
  } catch (err) {
    console.log("Database connection failed", err);

    process.exit(1);
  }
}

export default dbConnect;
