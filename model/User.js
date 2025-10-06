import mongoose from 'mongoose'; // Import mongoose for MongoDB schema

// Define schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  // Username of the user, required
  email: { type: String, required: true, unique: true }, 
  // Email of the user, required and must be unique
  password: { type: String, required: true } 
  // Password for authentication, required
});

export default mongoose.model('User', userSchema); 
// Export mongoose model named 'User' for CRUD operations
