

// // frontend/src/components/ProductList.js
import "../css/productlist.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('There was an error fetching the products!', error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="pro-con">
        {products.map(product => (
          <div key={product._id} className=''>
            <Link to={`/product/${product._id}`} className="link">
              <div className="main-con">
                <div className="img-con">
                  <img src="" alt="" height={200} width={200}/>
                </div>
              <div className="">
              {product.name}
            - ${product.price}
            </div>
            </div>
            </Link> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// frontend/src/components/ProductList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../css/productlist.css"

// import { Link } from 'react-router-dom';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products')
//       .then(response => setProducts(response.data))
//       .catch(error => console.error('There was an error fetching the products!', error));
//   }, []);

//   return (
//     <div>
//       <h1>Products</h1>
//       <div className='pro-con'>
//         {products.map(product => (
//           <div key={product._id}>
//             <Link to={`/product/${product._id}`} className="link">
//             <div className="main-con">
//             <div className="img-con">
//                    <img src="" alt="" height={200} width={200}/>
//                </div>
//               <div className="">
//               {product.name}- ${product.price}
             
//               </div>
//               </div>
//               </Link> 
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;