import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = async (e) => {
    await axios({
      method: "POST",
      url: process.env.REACT_APP_API_BASE_URL + "/auth/auth/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.message == "Login successfull") {
          setToken(true);
          localStorage.setItem("AuthKey", res.data.data.token);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="w-100">
      <div className=" col-4 float-right m-5 p-4 loginContainer row">
        <div className="col-12">
          <h2>Sign In</h2>
        </div>
        <br />
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
        </div>
        <div className="col-12 mt-3">
          <button className=" float-right" onClick={handleSignin}>
            Sign In
          </button>
        </div>
        <div className="col-12 mt-3 ">
          <button className=" float-right ml-2" onClick={handleSignUp}>
            Sign Up
          </button>
          <p className="float-right">Don't have an account? </p>
        </div>
      </div>
    </div>
  );
}

// Signin.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
