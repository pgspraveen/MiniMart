import express from 'express'; // Import Express framework
import mongoose from 'mongoose'; // Import Mongoose for MongoDB
import cors from 'cors'; // Import CORS for cross-origin requests
import jwt from 'jsonwebtoken'; // Import JWT for authentication

import User from './model/User.js'; // Import User model
import Product from './model/Product.js'; // Import Product model
import authMiddleware from './middleware.js'; // Import custom authentication middleware

const app = express(); // Create Express app
const PORT = 5000; // Define server port
const JWT_SECRET = 'jwtSecret'; // Secret key for JWT signing

app.use(cors({ origin: '*' })); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// ----------------- CONNECT TO MONGODB -----------------
mongoose.connect(
  'mongodb+srv://pgspraveenn:pgspraveenn@cluster0.v7bxvcv.mongodb.net/simple_ecommerce?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true } // Connection options
)
.then(() => console.log('✅ MongoDB Connected (simple_ecommerce DB)')) // Success message
.catch(err => console.log(err)); // Log errors if connection fails

// ----------------- AUTH ROUTES -----------------

// REGISTER ROUTE
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body; // Get form data

    let exist = await User.findOne({ email }); // Check if user exists
    if (exist) return res.status(400).send('User already exists'); // Send error if exists
    if (password !== confirmpassword) return res.status(400).send('Passwords do not match'); // Check password

    const newUser = new User({ username, email, password }); // Create new user
    await newUser.save(); // Save user to DB

    res.status(200).send('Registered Successfully'); // Success response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); // Internal server error
  }
});

// LOGIN ROUTE
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Get login credentials
    const user = await User.findOne({ email }); // Find user in DB

    if (!user) return res.status(400).send('User not found'); // Error if user not found
    if (user.password !== password) return res.status(400).send('Invalid credentials'); // Error if password mismatch

    const payload = { user: { id: user._id } }; // JWT payload
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Generate token

    res.json({ token }); // Send token to client
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); // Internal server error
  }
});

// PROFILE ROUTE
app.get('/myprofile', authMiddleware(JWT_SECRET), async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Find user by ID from token
    if (!user) return res.status(400).send('User not found'); // Error if not found
    res.json(user); // Send user info
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); // Internal server error
  }
});

// ----------------- PRODUCT ROUTES -----------------

// Add product route
app.post('/addproduct', authMiddleware(JWT_SECRET), async (req, res) => {
  try {
    const { name, price, description } = req.body; // Get product info
    const newProduct = new Product({ name, price, description, user: req.user.id }); // Create new product
    await newProduct.save(); // Save product to DB
    const products = await Product.find({ user: req.user.id }); // Fetch user's products
    res.json(products); // Return products
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all products route
app.get('/products', authMiddleware(JWT_SECRET), async (req, res) => {
  try {
    const products = await Product.find(); // Get all products from DB
    res.json(products); // Return products
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update product route
app.put('/updateproduct/:id', authMiddleware(JWT_SECRET), async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body); // Update product by ID
    const products = await Product.find({ user: req.user.id }); // Fetch updated products
    res.json(products); // Return updated list
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete product route
app.delete('/deleteproduct/:id', authMiddleware(JWT_SECRET), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id); // Delete product by ID
    const products = await Product.find({ user: req.user.id }); // Fetch remaining products
    res.json(products); // Return updated list
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`)); // Start server
