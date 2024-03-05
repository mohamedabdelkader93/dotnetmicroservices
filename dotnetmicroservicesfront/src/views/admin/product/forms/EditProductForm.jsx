import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import renderFormGroupField from "../../../../helpers/renderFormGroupField";
import renderFormField from "../../../../helpers/renderFormField";
import renderFormFileInput from "../../../../helpers/renderFormFileInput";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../../../helpers/validation";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useEffect, useState } from "react";
import { loadProfileState } from "../../../../localStorage";
import axios from "axios";
import { connect } from "react-redux";
const profileState = loadProfileState();
let pro = null;

const EditProductForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed, onImageChange,
    imagePreview } = props;
  const [productDetails, setProductDetails] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  
  useEffect( () => {
    getProductDetails(location.pathname.split("/").pop())
    console.log("mm", location.pathname.split("/").pop(), searchParams.get("id"))
    console.log("profileState", profileState)
  }, [])

  useEffect( () => {
   console.log("pro", productDetails)
  }, [productDetails])

  const getProductDetails = async (Id) => {
    await axios.get(`https://localhost:7000/api/product/${Id}`, {
      headers : {
        "Autherization": `Bearer ${profileState.token}`
      }
    })
      .then(response => {
        if(response && response.data && response.data.result){
        setProductDetails(response.data.result);
        pro= response.data.result;
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      {productDetails &&
      <div className="row mb-3">
        <div className="col-md-12">
          <Field
            name="Name"
            type="text"
            label="Name"
            component={renderFormField}
            placeholder="Name"
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-12">
          <Field
            name="Description"
            type="text"
            label="Description"
            component={renderFormField}
            placeholder="Description"
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-12">
          <Field
            name="Price"
            type="number"
            label="Price"
            component={renderFormField}
            placeholder=""
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-12">
          <Field
            name="CategoryId"
            type="text"
            label="CategoryId"
            component={renderFormField}
            placeholder="Category Id"
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-12">
          <Field
            name="ImageUrl"
            type="text"
            label="ImageUrl"
            component={renderFormField}
            placeholder="url"
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-12">
          <Field
            name="ImageLocalPath"
            type="text"
            label="ImageLocalPath"
            component={renderFormField}
            placeholder="url"
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-12">
          <Field
            name="ProductId"
            type="text"
            label="ProductId"
            component={renderFormField}
            placeholder="ProductId"
            validate={[required]}
            required={true}
          />
        </div>
        
        <div className="col-md-12">
        <img
          src={imagePreview ? imagePreview : "../../../../images/NO_IMG.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <Field
            name="Image"
            component={renderFormFileInput}
            onImageChange={onImageChange}
            // validate={[required]}
            tips="You don't allow uploading a photo more than 5MB"
          />
        </div>
      </div>
}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Edit
        </button>
      </div>
    </form>
  );
};

// export default compose(
//   reduxForm({
//     form: "EditProductForm",
//   })
// )(EditProductForm);
const mapStateToProps = (state) => {
  return {
    initialValues: {
      Name: pro?.name,
      Description: pro?.description,
      Price: pro?.price,
      CategoryId: pro?.categoryId,
      ImageUrl: pro?.imageUrl,
      ImageLocalPath: pro?.imageLocalPath,
      ProductId: pro?.productId,
      Image: pro?.Image
      // Name: productDetails.name,
      // lastName: state.welcome.lastName,
      // email: state.welcome.email
    }
  }
}
export default connect(mapStateToProps)(reduxForm({ form: 'EditProductForm', enableReinitialize: true})(EditProductForm))
