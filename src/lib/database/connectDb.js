import mongoose from "mongoose"

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "your_db_name", // optional
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log("MongoDB connected ✅")
  } catch (error) {
    console.error("MongoDB connection error ❌", error)
  }
}
