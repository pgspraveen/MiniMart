# MiniMart 🛒

MiniMart is a simple e-commerce web application where users can register, login, view products, add products to cart, and place orders.  

---

## Features

- User registration and login with JWT authentication
- Display products with price and description
- Add products to cart and remove from cart
- Place orders from the cart
- Profile page shows user info and cart items

---

## Technologies Used

- **Frontend:** React.js, Axios, CSS  
- **Backend:** Node.js, Express.js, JWT  
- **Database:** MongoDB  

---

## Project Structure

### Backend
- `server.js` - Main backend server
- `model/User.js` - User schema
- `model/Product.js` - Product schema
- `middleware.js` - JWT authentication middleware

### Frontend
- `App.jsx` - Main React app
- `components/` - Contains Nav, Register, Login, MyProfile, ProductList
- `index.jsx` - Entry point
- `*.css` - Styling for each component

---

## Installation

### Backend
```bash
cd backend
npm install
node server.js
