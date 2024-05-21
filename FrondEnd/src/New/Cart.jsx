// frontend/src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cartItems');
      setCartItems(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('There was an error fetching the cart items!', error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + (item.productId.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  };

  const updateQuantity = async (id, newQuantity, stock) => {
    try {
      if (newQuantity <= stock && newQuantity > 0) {
        const response = await axios.put(`http://localhost:5000/api/cartItems/${id}`, { quantity: newQuantity });
        const updatedItems = cartItems.map(item => item._id === id ? response.data : item);
        setCartItems(updatedItems);
        calculateTotal(updatedItems);
      }
    } catch (error) {
      console.error('There was an error updating the quantity!', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cartItems/${id}`);
      const updatedItems = cartItems.filter(item => item._id !== id);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('There was an error removing the item!', error);
    }
  };

  const increaseQuantity = (id, currentQuantity, maxStock) => {
    if (currentQuantity < maxStock) {
      updateQuantity(id, currentQuantity + 1, maxStock);
    }
  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1, currentQuantity - 1);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <p>Total items: {cartItems.length}</p>
      <p>Total amount: ${totalAmount.toFixed(2)}</p>
      <div>
        {cartItems.map(item => (
          <div key={item._id}>
            <div className="">
              <img src="" alt="" height={100} width={100} />
            </div>
            <div className="">
            {item.productId.name} - ${item.productId.price} x {item.quantity}
            <button onClick={() => decreaseQuantity(item._id, item.quantity)} disabled={item.quantity === 1}>-</button>
            <input type="number" value={item.quantity} onChange={e => updateQuantity(item._id, Number(e.target.value), item.productId.stock)} min="1" max={item.productId.stock} />
            <button onClick={() => increaseQuantity(item._id, item.quantity, item.productId.stock)} disabled={item.quantity === item.productId.stock}>+</button>
            <button onClick={() => removeItem(item._id)}>Remove</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;




