import axios from 'axios';
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProductsView = () => {

  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);


  useEffect( () => {
    getProductsList()
  }, [])


  const getProductsList = async () => {
    await axios.get(`https://localhost:7000/api/product`)
      .then(response => {
        if(response && response.data && response.data.result){
        setProductsList(response.data.result);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mb-3">
      {/* <h4 className="my-3">Dashboard</h4> */}
      <div>
        <h5>Products <Link
          to={`/admin/products/create`}
          className="btn btn-primary mt-3"
        >Create</Link></h5>
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>

          </tr>
        </thead>
        <tbody>
          {productsList.map((product, index) => 
            <tr key={index}>
              <th scope="row">{product.productId}</th>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.categoryName}</td>
              <td><img src={`${product.imageUrl}`} alt={product.Name} width={50} height={50} /></td>
              <td><div style={{"width": "max-content"}}>
              <Link
          to={`/admin/products/edit/${product.productId}`}
          className="btn btn-primary mt-3"
        >
          Edit
        </Link>
        <button
          type="submit"
          className="btn btn-danger mt-3"
        >
          Delete
        </button>
                </div></td>
            </tr>
          )}

        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default ProductsView;
