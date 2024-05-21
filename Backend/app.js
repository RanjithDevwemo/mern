// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ecommerce');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number
});

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number
});

const Product = mongoose.model('Product', ProductSchema);
const CartItem = mongoose.model('CartItem', CartItemSchema);

// Routes
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

app.post('/api/cartItems', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (product.stock < quantity) {
    return res.status(400).send('Insufficient stock');
  }
  product.stock -= quantity;
  await product.save();

  let cartItem = await CartItem.findOne({ productId });
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = new CartItem({ productId, quantity });
  }
  await cartItem.save();
  res.send(cartItem);
});

app.put('/api/cartItems/:id', async (req, res) => {
  const { quantity } = req.body;
  const cartItem = await CartItem.findById(req.params.id).populate('productId');
  if (cartItem.productId.stock + cartItem.quantity < quantity) {
    return res.status(400).send('Insufficient stock');
  }

  cartItem.productId.stock += cartItem.quantity - quantity;
  await cartItem.productId.save();

  cartItem.quantity = quantity;
  await cartItem.save();
  res.send(cartItem);
});

app.delete('/api/cartItems/:id', async (req, res) => {
  const cartItem = await CartItem.findById(req.params.id).populate('productId');
  cartItem.productId.stock += cartItem.quantity;
  await cartItem.productId.save();

  await CartItem.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

app.get('/api/cartItems', async (req, res) => {
  const cartItems = await CartItem.find().populate('productId');
  res.send(cartItems);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});











// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json)
// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ecommerce');

// // Define Schemas
// const ProductSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   description: String,
//   stock: Number
// });

// const CartItemSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   quantity: Number
// });

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   phoneNumber: String,
//   address: String
// });

// // Define Models
// const Product = mongoose.model('Product', ProductSchema);
// const CartItem = mongoose.model('CartItem', CartItemSchema);
// const User = mongoose.model('User', UserSchema);

// // Middleware to authenticate JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const verified = jwt.verify(token, 'secret');
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send('Invalid Token');
//   }
// };

// // Product Routes
// app.get('/api/products', async (req, res) => {
//   const products = await Product.find();
//   res.send(products);
// });

// app.get('/api/products/:id', async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.send(product);
// });

// // Cart Routes
// app.post('/api/cartItems', authenticateToken, async (req, res) => {
//   const { productId, quantity } = req.body;
//   const product = await Product.findById(productId);
//   if (product.stock < quantity) {
//     return res.status(400).send('Insufficient stock');
//   }
//   product.stock -= quantity;
//   await product.save();

//   let cartItem = await CartItem.findOne({ productId, userId: req.user._id });
//   if (cartItem) {
//     cartItem.quantity += quantity;
//   } else {
//     cartItem = new CartItem({ productId, userId: req.user._id, quantity });
//   }
//   await cartItem.save();
//   res.send(cartItem);
// });

// app.put('/api/cartItems/:id', authenticateToken, async (req, res) => {
//   const { quantity } = req.body;
//   const cartItem = await CartItem.findById(req.params.id).populate('productId');
//   if (cartItem.productId.stock + cartItem.quantity < quantity) {
//     return res.status(400).send('Insufficient stock');
//   }

//   cartItem.productId.stock += cartItem.quantity - quantity;
//   await cartItem.productId.save();

//   cartItem.quantity = quantity;
//   await cartItem.save();
//   res.send(cartItem);
// });

// app.delete('/api/cartItems/:id', authenticateToken, async (req, res) => {
//   const cartItem = await CartItem.findById(req.params.id).populate('productId');
//   cartItem.productId.stock += cartItem.quantity;
//   await cartItem.productId.save();

//   await CartItem.findByIdAndDelete(req.params.id);
//   res.send({ success: true });
// });

// app.get('/api/cartItems', authenticateToken, async (req, res) => {
//   const cartItems = await CartItem.find({ userId: req.user._id }).populate('productId');
//   res.send(cartItems);
// });

// // User Routes
// app.post('/api/register', async (req, res) => {
//   const { name, email, password, phoneNumber, address } = req.body;

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//     phoneNumber,
//     address
//   });

//   try {
//     const savedUser = await user.save();
//     res.send(savedUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send('Email or password is wrong');

//   const validPass = await bcrypt.compare(password, user.password);
//   if (!validPass) return res.status(400).send('Invalid password');

//   const token = jwt.sign({ _id: user._id, name: user.name }, 'secret');
//   res.header('Authorization', token).send({ token, name: user.name });
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });






// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ecommerce');

// // Define Schemas
// const ProductSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   description: String,
//   stock: Number
// });

// const CartItemSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   quantity: Number
// });

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   phoneNumber: String,
//   address: String
// });

// // Define Models
// const Product = mongoose.model('Product', ProductSchema);
// const CartItem = mongoose.model('CartItem', CartItemSchema);
// const User = mongoose.model('User', UserSchema);

// // Middleware to authenticate JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const verified = jwt.verify(token, 'secret');
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send('Invalid Token');
//   }
// };

// // Product Routes
// app.get('/api/products', async (req, res) => {
//   const products = await Product.find();
//   res.send(products);
// });

// app.get('/api/products/:id', async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.send(product);
// });

// // Cart Routes
// // app.post('/api/cartItems', authenticateToken, async (req, res) => {
// //   const { productId, quantity } = req.body;
// //   const product = await Product.findById(productId);
// //   if (product.stock < quantity) {
// //     return res.status(400).send('Insufficient stock');
// //   }
// //   product.stock -= quantity;
// //   await product.save();

// //   let cartItem = await CartItem.findOne({ productId, userId: req.user._id });
// //   if (cartItem) {
// //     cartItem.quantity += quantity;
// //   } else {
// //     cartItem = new CartItem({ productId, userId: req.user._id, quantity });
// //   }
// //   await cartItem.save();
// //   res.send(cartItem);
// // });


// app.post('/api/cartItems', async (req, res) => {
//   const { productId, quantity } = req.body;
//   const product = await Product.findById(productId);
//   if (product.stock < quantity) {
//     return res.status(400).send('Insufficient stock');
//   }
//   product.stock -= quantity;
//   await product.save();

//   let cartItem = await CartItem.findOne({ productId });
//   if (cartItem) {
//     cartItem.quantity += quantity;
//   } else {
//     cartItem = new CartItem({ productId, quantity });
//   }
//   await cartItem.save();
//   res.send(cartItem);
// });



// app.put('/api/cartItems/:id', authenticateToken, async (req, res) => {
//   const { quantity } = req.body;
//   const cartItem = await CartItem.findById(req.params.id).populate('productId');
//   if (cartItem.productId.stock + cartItem.quantity < quantity) {
//     return res.status(400).send('Insufficient stock');
//   }

//   cartItem.productId.stock += cartItem.quantity - quantity;
//   await cartItem.productId.save();

//   cartItem.quantity = quantity;
//   await cartItem.save();
//   res.send(cartItem);
// });

// app.delete('/api/cartItems/:id', authenticateToken, async (req, res) => {
//   const cartItem = await CartItem.findById(req.params.id).populate('productId');
//   cartItem.productId.stock += cartItem.quantity;
//   await cartItem.productId.save();

//   await CartItem.findByIdAndDelete(req.params.id);
//   res.send({ success: true });
// });

// app.get('/api/cartItems', authenticateToken, async (req, res) => {
//   const cartItems = await CartItem.find({ userId: req.user._id }).populate('productId');
//   res.send(cartItems);
// });

// // User Routes
// app.post('/api/register', async (req, res) => {
//   const { name, email, password, phoneNumber, address } = req.body;

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//     phoneNumber,
//     address
//   });

//   try {
//     const savedUser = await user.save();
//     res.send(savedUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send('Email or password is wrong');

//   const validPass = await bcrypt.compare(password, user.password);
//   if (!validPass) return res.status(400).send('Invalid password');

//   const token = jwt.sign({ _id: user._id, name: user.name }, 'secret');
//   res.header('Authorization', token).send({ token, name: user.name });
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
