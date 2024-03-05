import { lazy } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const SignInView = () => {
  const onSubmit = async (values) => {
    // alert(JSON.stringify(values));
    console.log("values", values);
    axios.post('https://localhost:7002/api/auth/login', values)
      .then(response => {
        console.log("response", response);
        if(response && response.data && response.data.result){
          localStorage.setItem("profile", JSON.stringify(response.data.result));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
          <Link to="/">
            <img
              src="../../images/banner/Dell.webp"
              alt="..."
              className="img-fluid"
            />
          </Link>
          <Link to="/">
            <img
              src="../../images/banner/Laptops.webp"
              alt="..."
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Sign In</h4>
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignInView;
