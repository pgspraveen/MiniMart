import mongoose from 'mongoose'; // Import mongoose for MongoDB schema

// Define schema for Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name, required field
  price: { type: Number, required: true }, // Product price, required field
  description: { type: String }, // Optional description
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  // Reference to the User who added the product (relation)
  date: { type: Date, default: Date.now } 
  // Timestamp when product is created, defaults to current date
});

export default mongoose.model('Product', productSchema); 
// Export mongoose model named 'Product' for CRUD operations
