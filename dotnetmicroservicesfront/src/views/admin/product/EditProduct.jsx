import axios from "axios";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { loadProfileState } from "../../../localStorage";
const profileState = loadProfileState();
const EditProductForm = lazy(() => import("./forms/EditProductForm"));

const EditProductView = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const onImageChange = async (obj) => {
    if (obj) {
      const val = await getBase64(obj);
      setImagePreview(val)
    } else {
      setImagePreview("")
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values) => {
    // alert(JSON.stringify(values));
    if(values && values.Image){
    console.log("dd", values)
    }
    axios.put(`https://localhost:7000/api/product`, values, {
      headers : {
        'Content-Type': 'multipart/form-data',
        // 'Accept': 'application/json',
        "Authorization": `Bearer ${profileState.token}`
      }
    })
      .then(response => {
        console.log("response", response);
        if(response && response.data && response.data.result){
          // localStorage.setItem("profile", JSON.stringify(response.data.result));
          console.log("respon3", response)
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-12 p-3">
          <h4 className="text-center">Sign Up</h4>
          <EditProductForm onSubmit={onSubmit}onImageChange={onImageChange}
              imagePreview={imagePreview} />
        </div>
      </div>
    </div>
  );
};

export default EditProductView;
