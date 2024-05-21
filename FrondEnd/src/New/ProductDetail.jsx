
// frontend/src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const ProductDetail = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('There was an error fetching the product!', error));
  }, [id]);

  const addToCart = () => {
    axios.post('http://localhost:5000/api/cartItems', {
      productId: product._id,
      quantity,
    })
      .then(response => {
        alert('Added to cart');
        history.push('/cart');
      })
      .catch(error => {
        console.error('There was an error adding to the cart!', error);
      });
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <div className="">
        <img src="" alt="" height={100} width={100}/>
      </div>
      <div className="">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>
      </div>
      <button onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" max={product.stock} />
      <button onClick={increaseQuantity} disabled={quantity === product.stock}>+</button>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;



// frontend/src/components/ProductDetail.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams,useNavigate} from 'react-router-dom';

// const ProductDetail = () => {
//   const { id } = useParams();
//   // const history = useNavigate();
//   const navicate=useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then(response => setProduct(response.data))
//       .catch(error => console.error('There was an error fetching the product!', error));
//   }, [id]);

//   const addToCart = () => {
//     axios.post('http://localhost:5000/api/cartItems', {
//       productId: product._id,
//       quantity,
//     })
//       .then(response => {
//         alert('Added to cart');
//         navicate('/cart');
//       })
//       .catch(error => {
//         console.log('There was an error adding to the cart!', error);
//       });
//   };

//   const increaseQuantity = () => {
//     if (quantity < product.stock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//       <p>Stock: {product.stock}</p>
//       <button onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
//       <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" max={product.stock} />
//       <button onClick={increaseQuantity} disabled={quantity === product.stock}>+</button>
//       <button onClick={addToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductDetail;


