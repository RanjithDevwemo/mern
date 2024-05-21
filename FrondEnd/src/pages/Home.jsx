import React, { useEffect, useState } from 'react'
// import axios from "axios"
export default function Home() {
  const [products,setproducts]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:8003/api/v1/products").then(res=>res.json)
    .then(res=>setproducts(res.data))
  },[])
console.log(products)
  return (
    <div>
  

    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">

{products.map((product)=>(

        <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={product} >
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={product.images[0].image}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <a href=""></a>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                </div>
              </div>
              <p className="card-text">$245.67</p>
              <a href="#" id="view_btn" className="btn btn-block">View Details</a>
            </div>
          </div>
        </div>
))}
  
      </div>
    </section>

 
    </div>
  )
}
