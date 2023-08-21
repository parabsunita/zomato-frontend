import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
const initialTimeslot = {
  startTime: null,
  endTime: null,
};
var initialValues = {
  name: "",
  user_id: "64a1224bdc7722cc653fc986",
  location: {
    type: "Point",
    coordinates: [],
  },
  contact: "",
  email: "",
  address: "",
  cuisines: "",
  timeslots: [initialTimeslot],
  opening_days: [],
  approval_status: "PENDING",
  resturant_images: [],
  food_images: [],
  rejection_season: "",
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  location: Yup.object().shape({
    type: Yup.string().oneOf(["Point"]).required("Required"),
    coordinates: Yup.array().of(Yup.number()).required("Required"),
  }),
  contact: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
  cuisines: Yup.string().required("Required"),
  timeslots: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.date().required("Required"),
      endTime: Yup.date().required("Required"),
    })
  ),
  opening_days: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Please select at least one opening day")
    .required("Required"),
  approval_status: Yup.string()
    .oneOf(["PENDING", "REJECTED", "VERIFIED"], "Invalid Approval Status")
    .required("Required"),
  resturant_images: Yup.string().required("Required"),
  food_images: Yup.string().required("Required"),
  rejection_season: Yup.string().required("Required"),
});

const RestaurantForm = ({ isEdit }) => {
  const { restaurantId } = useParams();
  const [formValues, setFormValues] = useState(null);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const handleSubmit = (values, { setSubmitting }) => {
    const apiUrl = isEdit
      ? process.env.REACT_APP_API_BASE_URL +
        `/restaurant/restaurant/editResturant/64ce778d24de7cd8a5bd036d`
      : process.env.REACT_APP_API_BASE_URL +
        "/restaurant/restaurant/addrestaurant";
    const updatedValues = {
      ...values,
      timeslot: values.timeslot.map((slot) => ({
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
      })),
    };
    axios
      .post(apiUrl, updatedValues)
      .then((response) => {
        // Handle the API response as needed
        alert("API response:", response.data.message);

        // Reset the form after successful submission
        setSubmitting(false);
      })
      .catch((error) => {
        alert("Error submitting the form:", error);
        setSubmitting(false);
      });
  };
  useEffect(() => {
    const fetchRestaurantData = async () => {
      await axios
        .get(
          process.env.REACT_APP_API_BASE_URL +
            `/restaurant/restaurant/findResturant/${restaurantId}`
        )
        .then((response) => {
          if (isEdit) {
            // Parse the startTime and endTime strings into Date objects
            const parsedTimeslot = response.data.timeslot.map((slot) => ({
              startTime: parseISO(slot.startTime),
              endTime: parseISO(slot.endTime),
            }));
            setFormValues({
              ...response.data,
              timeslot: parsedTimeslot,
              user_id: "64a1224bdc7722cc653fc986",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    };
    const fetchCusines = async () => {
      await axios
        .get(
          process.env.REACT_APP_API_BASE_URL + `/restaurant/cuisine/getCuisine`
        )
        .then((response) => {
          if (!isEdit) {
            // Parse the startTime and endTime strings into Date objects
            setCuisineOptions(response.data.cuisine);
          }
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    };
    if (isEdit) {
      fetchRestaurantData();
    }

    fetchCusines();
  }, [initialValues]);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(
        { isSubmitting, values, setFieldValue } // Destructure 'values' and 'setFieldValue'
      ) => (
        <Form className="">
          <div className="col-12 row">
            <fieldset className="border mx-3 px-3 w-100 pb-1 ">
              <legend className="mb-0  w-auto">Personal Details</legend>
              <div className="col-12 row">
                <div className=" col-3">
                  <label htmlFor="name">Name</label>
                  <Field className="d-block" type="text" name="name" />
                  <ErrorMessage className="error" name="name" component="div" />
                </div>

                <div className=" col-3">
                  <label htmlFor="contact">Contact</label>
                  <Field className="d-block" type="text" name="contact" />
                  <ErrorMessage
                    className="error"
                    name="contact"
                    component="div"
                  />
                </div>

                <div className=" col-3">
                  <label htmlFor="email">Email</label>
                  <Field className="d-block" type="email" name="email" />
                  <ErrorMessage
                    className="error"
                    name="email"
                    component="div"
                  />
                </div>
                <div className=" col-3">
                  <label htmlFor="address">Address</label>
                  <Field className="d-block" type="text" name="address" />
                  <ErrorMessage
                    className="error"
                    name="address"
                    component="div"
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <div className="col-12 row resturantForm ">
            <div className=" col-3">
              <fieldset className="border fieldContainer py-2 px-3 ">
                <legend className="mb-0 w-auto">Location:Point</legend>
                <div>
                  <label>Latitude:</label>
                  <Field
                    type="number"
                    name="location.coordinates[0]"
                    step="any"
                  />
                </div>
                <div>
                  <label>Longitude:</label>
                  <Field
                    type="number"
                    name="location.coordinates[1]"
                    step="any"
                  />
                </div>
                <ErrorMessage
                  className="error"
                  name="location"
                  component="div"
                />
              </fieldset>
              {/* <label htmlFor="location">Location</label> */}
              {/* <Field type="text" name="location.type" readOnly /> */}
            </div>

            <div className=" col-3">
              <fieldset
                className="border fieldContainer py-2 px-3 "
                style={{ overflow: "auto" }}
              >
                <legend className="mb-0 ml-2 w-auto ">Time Details</legend>

                <FieldArray name="timeslots">
                  {(arrayHelpers) => (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ ...initialTimeslot })
                        }
                      >
                        +
                      </button>
                      {values.timeslots.map((timeslot, index) => (
                        <div key={index}>
                          <label>Timeslot {index + 1}</label>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="ml-1"
                          >
                            -
                          </button>
                          <div>
                            <label>Start Time:</label>
                            <DatePicker
                              selected={timeslot.startTime}
                              onChange={(date) =>
                                arrayHelpers.replace(index, {
                                  ...timeslot,
                                  startTime: date,
                                })
                              }
                              // ...other date picker props
                            />
                          </div>
                          <div>
                            <label>End Time:</label>
                            <DatePicker
                              selected={timeslot.endTime}
                              onChange={(date) =>
                                arrayHelpers.replace(index, {
                                  ...timeslot,
                                  endTime: date,
                                })
                              }
                              // ...other date picker props
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
                <ErrorMessage
                  className="error"
                  name="timeslot[0].startTime"
                  component="div"
                />
              </fieldset>
            </div>

            <div className=" col-3">
              <fieldset className="border fieldContainer py-2 px-3 ">
                <legend className="mb-0 ml-2 w-auto">Opening Days</legend>
                <div>
                  <label className="d-block m-0">
                    <Field type="checkbox" name="opening_days" value="Monday" />
                    Monday
                  </label>
                  <label className="d-block m-0">
                    <Field
                      type="checkbox"
                      name="opening_days"
                      value="Tuesday"
                    />
                    Tuesday
                  </label>
                  <label className="d-block m-0">
                    <Field
                      type="checkbox"
                      name="opening_days"
                      value="Wednesday"
                    />
                    Wednesday
                  </label>
                  <label className="d-block m-0">
                    <Field
                      type="checkbox"
                      name="opening_days"
                      value="Thursday"
                    />
                    Thursday
                  </label>
                  <label className="d-block m-0">
                    <Field type="checkbox" name="opening_days" value="Friday" />
                    Friday
                  </label>
                  <label className="d-block m-0">
                    <Field
                      type="checkbox"
                      name="opening_days"
                      value="Saturday"
                    />
                    Saturday
                  </label>
                  <label className="d-block m-0">
                    <Field type="checkbox" name="opening_days" value="Sunday" />
                    Sunday
                  </label>
                </div>
                <ErrorMessage
                  className="error"
                  name="opening_days"
                  component="div"
                />
              </fieldset>
            </div>
            <div className=" col-3">
              <fieldset
                className="border fieldContainer  px-3 py-2"
                style={{ overflow: "auto" }}
              >
                <legend className="mb-0 ml-2 w-auto">Resturant Details</legend>
                <div className=" ">
                  <label htmlFor="cuisines" className="w-100">
                    Cuisines
                  </label>
                  <Field as="select" name="cuisines" className="w-100 p-1">
                    <option value="">Select a cuisine</option>
                    {cuisineOptions.map((cuisine) => (
                      <option key={cuisine._id} value={cuisine.name}>
                        {cuisine.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    className="error"
                    name="cuisines"
                    component="div"
                  />
                </div>
                <div className=" ">
                  <label htmlFor="resturant_images">Restaurant Images</label>
                  <FieldArray name="resturant_images">
                    {(arrayHelpers) => (
                      <>
                        <button
                          type="button"
                          className="float-right"
                          onClick={() => arrayHelpers.push("")}
                        >
                          +
                        </button>
                        <div>
                          {values.resturant_images.map((image, index) => (
                            <div key={index} className="mt-3">
                              <label>Image {index + 1}</label>
                              <Field
                                type="text"
                                name={`resturant_images[${index}]`}
                              />
                              <button
                                type="button"
                                className="float-right"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </FieldArray>
                  <ErrorMessage
                    className="error"
                    name="resturant_images"
                    component="div"
                  />
                </div>

                <div className=" mt-4">
                  <label htmlFor="food_images">Food Images</label>
                  <FieldArray name="food_images">
                    {(arrayHelpers) => (
                      <>
                        <button
                          type="button"
                          className="float-right"
                          onClick={() => arrayHelpers.push("")}
                        >
                          +
                        </button>
                        <div>
                          {values.food_images.map((image, index) => (
                            <div key={index} className="mt-3">
                              <label>Food Image {index + 1}</label>
                              <Field
                                type="text"
                                name={`food_images[${index}]`}
                              />
                              <button
                                type="button"
                                className="float-right"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </FieldArray>
                  <ErrorMessage
                    className="error"
                    name="food_images"
                    component="div"
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                disabled={isSubmitting}
                className="float-right mt-4 px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
          {/* <div className="col-12 row">
            <fieldset className="border fieldContainer py-2 px-3 ml-3 w-75">
              <legend className="mb-0 ml-2 w-auto">Resturant Details</legend>

              <label htmlFor="rejection_season" className="mr-3">
                Rejection Season
              </label>
              <Field type="text" name="rejection_season" />
              <ErrorMessage
                className="error d-inline-block"
                name="rejection_season"
                component="div"
              />

              <label htmlFor="approval_status" className="mx-3">
                Approval Status
              </label>
              <Field as="select" name="approval_status" className="p-1 rounded">
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
                <option value="VERIFIED">Verified</option>
              </Field>
              <ErrorMessage
                className="error d-inline-block"
                name="approval_status"
                component="div"
              />
            </fieldset>
            <div className="ml-5">
              {" "}
              <button
                type="submit"
                disabled={isSubmitting}
                className="float-right mt-4 px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default RestaurantForm;
