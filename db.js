import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};

const eventSchema = new mongoose.Schema({
  eventId: String,
  userId: String,
  route: String,
  action: String,
  timestamp: { type: Date, default: Date.now },
  metadata: Object,
});

export const UserEvent = mongoose.model("UserEvent", eventSchema);
