const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://masoompersonal1_db_user:xc1qbP77pBVBSK8o@agmcet.most2va.mongodb.net/agmcet?retryWrites=true&w=majority&appName=agmcet";

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");
    
    // Quick test to see if we can perform operations
    const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema({ username: String }));
    const count = await Admin.countDocuments();
    console.log("Admin count:", count);
    
  } catch (error) {
    console.error("Connection Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

run();
