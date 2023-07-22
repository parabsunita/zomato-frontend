import React, { useState } from "react";

import Signin from "./Signin";
import Signup from "./Signup";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [onSignUp, setonSignUp] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = () => {
    setonSignUp(false);
  };

  const handleSignUp = () => {
    setonSignUp(true);
  };

  return (
    <div>
      {onSignUp ? (
        <Signup
          onHandleEmailChange={handleEmailChange}
          onHandlePasswordChange={handlePasswordChange}
          onHandleSignin={handleSignin}
          onHandleSignUp={handleSignUp}
        ></Signup>
      ) : (
        <Signin
          onHandleEmailChange={handleEmailChange}
          onHandlePasswordChange={handlePasswordChange}
          onHandleSignin={handleSignin}
          onHandleSignUp={handleSignUp}
        ></Signin>
      )}
    </div>
  );
};

export default Landing;
