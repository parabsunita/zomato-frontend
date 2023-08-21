import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    const res = await axios
      .post(process.env.REACT_APP_API_BASE_URL + "/auth/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message === "Login successfull") {
          setToken(false);
          localStorage.setItem("AuthKey", res.data.data.token);
          navigate("/dashboard");
        }
      });
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="w-100">
      <div className="col-4 float-right m-5 p-4 loginContainer row">
        <div className="col-12">
          <h2>Sign In</h2>
        </div>
        <br />
        <form className="w-100" onSubmit={handleSignin}>
          <div className="col-12">
            <label className="w-100" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              className="w-100"
              onChange={handleEmailChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="col-12 mt-3">
            <label className="w-100" htmlFor="password">
              Password :
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              className="w-100"
              onChange={handlePasswordChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="col-12 mt-3">
            <button className="float-right" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="col-12 mt-3 ">
          <button className="float-right ml-2" onClick={handleSignUp}>
            Sign Up
          </button>
          <p className="float-right">Don't have an account? </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
