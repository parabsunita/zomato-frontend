import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CategoryForm = () => {
  const [restaurantOptions, setRestaurantOptions] = useState([]);

  // Fetch the list of restaurant names for the dropdown
  useEffect(() => {
    const fetchRestaurantNames = async () => {
      await axios
        .get("http://localhost:3000/api/restaurant/restaurant/details")
        .then((response) => {
          setRestaurantOptions(response.data.restaurants)
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    };
    fetchRestaurantNames();
  }, []);

  const validationSchema = Yup.object().shape({
    restaurant_id: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL +
          "/restaurant/catalogue/addcategory",
        {
          restaurant_id: values.restaurant_id,
          name: values.name,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error submitting the form:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="w-100">
      <h2>Add Category</h2>
      <Formik
        initialValues={{
          restaurant_id: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row col-12">
              <div className="col-4">
                <label htmlFor="restaurant_id">Restaurant Name : </label>
                <Field
                  as="select"
                  name="restaurant_id"
                  className="ml-1 ml-1 p-1 rounded"
                >
                  <option value="">Select a restaurant</option>
                  {restaurantOptions.map((restaurant) => (
                    <option key={restaurant._id} value={restaurant._id}>
                      {restaurant.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  className="error"
                  name="restaurant_id"
                  component="div"
                />
              </div>
              <div className="col-4">
                <label htmlFor="name">Category Name : </label>
                <Field type="text" name="name" className="ml-1  rounded" />
                <ErrorMessage className="error" name="name" component="div" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="float-right mr-5 rounded p-1"
            >
              Add Category
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryForm;
