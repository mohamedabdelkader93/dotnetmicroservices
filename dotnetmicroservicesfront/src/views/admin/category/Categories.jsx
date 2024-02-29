import axios from 'axios';
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";


const CategoriesView = () => {

  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);


  useEffect( () => {
    getCategoriesList()
  }, [])

  const getCategoriesList = async () => {
    await axios.get(`https://localhost:7000/api/category`)
      .then(response => {
        if(response.data.result){
          setCategoriesList(response.data.result);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mb-3">
      <h4 className="my-3">Dashboard</h4>
      <div>
        <h5>Categories</h5>
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((category) => 
            <tr>
              <th scope="row">{category.categoryId}</th>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td><img src={`${category.imageUrl}`} alt={category.Name} width={50} height={50} /></td>
            </tr>
          )}

        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CategoriesView;
