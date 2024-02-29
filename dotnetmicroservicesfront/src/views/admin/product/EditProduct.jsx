import { lazy } from "react";
import { Link } from "react-router-dom";
const EditProductForm = lazy(() => import("./forms/EditProductForm"));

const EditProductView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-12 p-3">
          <h4 className="text-center">Sign Up</h4>
          <EditProductForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditProductView;
