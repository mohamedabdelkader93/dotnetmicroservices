import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../../../helpers/renderFormGroupField";
import renderFormField from "../../../../helpers/renderFormField";
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

const CreateProductForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
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
            name="CategoryName"
            type="text"
            label="CategoryName"
            component={renderFormField}
            placeholder="Category name"
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
      </div>
    
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create
        </button>
      </div>

      
    </form>
  );
};

export default compose(
  reduxForm({
    form: "CreateProduct",
  })
)(CreateProductForm);
