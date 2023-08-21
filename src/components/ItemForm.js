import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";

const validationSchema = Yup.object().shape({
  restaurantName: Yup.string().required("Restaurant name is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  imgUrl: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
});

const initialValues = {
  restaurantName: "",
  price: "",
  description: "",
  imgUrl: "",
  isVeg: false,
  approvalStatus: "",
  rejectionStatus: "",
};

const ItemForm = () => {
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:3000/api/restaurant/catalogue/additem", values)
      .then((response) => {
        console.log("Item added successfully:", response.data);
        // Handle success notification or redirection if needed
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        // Handle error notification if needed
      });
  };
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant details from the API
    axios
      .get("http://localhost:3000/api/restaurant/restaurant/details")
      .then((response) => {
        setRestaurants(response.data.resturants);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  }, []);
  return (
    <div className="w-100">
      <h2>Add Restaurant</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="col-12 row">
            <div className="col-3">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <Field
                as="select"
                id="restaurantId"
                name="restaurantId"
                className="ml-1 ml-1 p-1 rounded d-block"
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="restaurantName"
                component="div"
                className="error"
              />
            </div>

            <div className="col-3">
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                id="price"
                name="price"
                className="rounded d-block"
              />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="col-3">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="rounded d-block"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>
            <div className="col-3">
              <label htmlFor="imgUrl">Image URL</label>
              <Field
                type="url"
                id="imgUrl"
                name="imgUrl"
                className="rounded d-block"
              />
              <ErrorMessage name="imgUrl" component="div" className="error" />
            </div>
          </div>
          <div className="col-12 row mt-3">
            <div className="col-3">
              <label htmlFor="isVeg" style={{ valign: "middle" }}>
                Is Vegetarian?
              </label>
              <Field
                type="checkbox"
                id="isVeg"
                name="isVeg"
                style={{ height: "20px", width: "25px" }}
              />
            </div>

            <div className="col-3">
              <label htmlFor="approvalStatus">Approval Status</label>
              <Field
                as="select"
                id="approvalStatus"
                name="approvalStatus"
                className="ml-1 ml-1 p-1 rounded d-block"
              >
                <option value="">Select Approval Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </Field>
            </div>
            <div className="col-3">
              <label htmlFor="rejectionStatus">Rejection Status</label>
              <Field
                as="select"
                id="rejectionStatus"
                name="rejectionStatus"
                className="ml-1 ml-1 p-1 rounded"
              >
                <option value="">Select Rejection Status</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </Field>
            </div>
          </div>

          <button
            type="submit"
            className="rounded float-right mr-5 mt-5 px-2 py-1"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ItemForm;
