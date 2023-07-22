import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    await axios({
      method: "POST",
      url: process.env.REACT_APP_API_BASE_URL + "/auth/auth/signup",
      data: formData,
    })
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="w-100">
      <div className="loginContainer col-4 float-right m-5 p-4  row">
        <div className="col-12">
          <h2 className="text-center w-100 mb-3">Signup</h2>

          <div className="col-12 row">
            <label className="w-100" htmlFor="firstName">
              First Name :
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="col-12 row">
            <label className="w-100" htmlFor="lastName">
              Last Name :
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="col-12 row">
            <label htmlFor="email" className="w-100">
              Email :{" "}
            </label>
            <br></br>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="col-12 row">
            <label className="w-100" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="col-12 row">
            <label htmlFor="userType" className="w-100">
              User Type:
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-100"
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>

          <div className="col-12 mt-3">
            <button className=" float-right" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
