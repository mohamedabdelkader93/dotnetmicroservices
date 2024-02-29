import axios from "axios";
import { lazy } from "react";
import { Link } from "react-router-dom";
import { loadProfileState } from "../../../localStorage";
const CreateProductForm = lazy(() => import("./forms/CreateProductForm"));
const profileState = loadProfileState();
const CreateProductView = () => {
  const onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    axios.post('https://localhost:7000/api/product', values, {
      headers: {
        Authorization: `Bearer ${profileState.token}`,
        'accept': 'text/plain',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("response", response);
        // localStorage.setItem("profile", JSON.stringify(response.data.result));
        // window.location = "/admin/dashboard";
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-12 p-3">
          <h4 className="text-center">Create Product</h4>
          <CreateProductForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateProductView;
