
import React, { useState, useEffect } from 'react';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Navbar from './New/Nav';
import ProductDetail from './New/ProductDetail';
import Products from './New/ProductList';
import Cart from './New/Cart';
import Register from './New/UserRegister';
import Login from './New/UserLogin';
// // import vue from "vue"


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cartItems');
      setCartItems(response.data);
    } catch (error) {
      console.error('There was an error fetching the cart items!', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser({ name: decodedToken.name });
    }
  }, []);

  // const fetchCartItems = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) return;
  //     const response = await axios.get('http://localhost:5000/api/cartItems', {
  //       headers: {
  //         'Authorization': token
  //       }
  //     });
  //     setCartItems(response.data);
  //   } catch (error) {
  //     console.error('There was an error fetching the cart items!', error);
  //   }
  // };


  return (
  

    <BrowserRouter>      <Navbar cartCount={cartItems.length} user={user} setUser={setUser}/>
    <Routes>
      <Route path="/" element={<Products/>} />
      <Route path="/product/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart/>} cartItems={cartItems} setCartItems={setCartItems} fetchCartItems={fetchCartItems} />
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;


